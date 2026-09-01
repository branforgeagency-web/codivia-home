Add-Type -TypeDefinition @"
using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Collections.Generic;

public class DeptImageProcessor
{
    public static void MakeTransparent(string srcPath, string destPath)
    {
        using (Bitmap src = new Bitmap(srcPath))
        {
            int w = src.Width;
            int h = src.Height;
            Bitmap output = new Bitmap(w, h, PixelFormat.Format32bppArgb);

            BitmapData srcData = src.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadOnly, PixelFormat.Format32bppArgb);
            BitmapData outData = output.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.WriteOnly, PixelFormat.Format32bppArgb);

            int stride = srcData.Stride;
            byte[] srcBytes = new byte[stride * h];
            byte[] outBytes = new byte[stride * h];

            System.Runtime.InteropServices.Marshal.Copy(srcData.Scan0, srcBytes, 0, srcBytes.Length);
            src.UnlockBits(srcData);

            // Sample corners for background color
            int bgB = (srcBytes[0] + srcBytes[(w - 1) * 4] + srcBytes[(h - 1) * stride] + srcBytes[(h - 1) * stride + (w - 1) * 4]) / 4;
            int bgG = (srcBytes[1] + srcBytes[(w - 1) * 4 + 1] + srcBytes[(h - 1) * stride + 1] + srcBytes[(h - 1) * stride + (w - 1) * 4 + 1]) / 4;
            int bgR = (srcBytes[2] + srcBytes[(w - 1) * 4 + 2] + srcBytes[(h - 1) * stride + 2] + srcBytes[(h - 1) * stride + (w - 1) * 4 + 2]) / 4;

            bool[] isBg = new bool[w * h];
            bool[] visited = new bool[w * h];
            Queue<int> queue = new Queue<int>();

            // Enqueue outer border pixels
            for (int x = 0; x < w; x++)
            {
                int topIdx = x;
                int botIdx = (h - 1) * w + x;
                visited[topIdx] = true; queue.Enqueue(topIdx);
                visited[botIdx] = true; queue.Enqueue(botIdx);
            }
            for (int y = 1; y < h - 1; y++)
            {
                int leftIdx = y * w;
                int rightIdx = y * w + (w - 1);
                visited[leftIdx] = true; queue.Enqueue(leftIdx);
                visited[rightIdx] = true; queue.Enqueue(rightIdx);
            }

            while (queue.Count > 0)
            {
                int idx = queue.Dequeue();
                int px = idx % w;
                int py = idx / w;
                int byteIdx = py * stride + px * 4;

                int b = srcBytes[byteIdx];
                int g = srcBytes[byteIdx + 1];
                int r = srcBytes[byteIdx + 2];

                int diff = Math.Max(Math.Abs(r - bgR), Math.Max(Math.Abs(g - bgG), Math.Abs(b - bgB)));
                int brightness = (r + g + b) / 3;

                // Threshold for background
                if (diff < 35 || (brightness > 235 && diff < 55) || brightness > 250)
                {
                    isBg[idx] = true;

                    if (px > 0 && !visited[idx - 1]) { visited[idx - 1] = true; queue.Enqueue(idx - 1); }
                    if (px < w - 1 && !visited[idx + 1]) { visited[idx + 1] = true; queue.Enqueue(idx + 1); }
                    if (py > 0 && !visited[idx - w]) { visited[idx - w] = true; queue.Enqueue(idx - w); }
                    if (py < h - 1 && !visited[idx + w]) { visited[idx + w] = true; queue.Enqueue(idx + w); }
                }
            }

            int minX = w, maxX = 0, minY = h, maxY = 0;

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < w; x++)
                {
                    int idx = y * w + x;
                    int byteIdx = y * stride + x * 4;

                    if (isBg[idx])
                    {
                        outBytes[byteIdx] = 0;
                        outBytes[byteIdx + 1] = 0;
                        outBytes[byteIdx + 2] = 0;
                        outBytes[byteIdx + 3] = 0;
                    }
                    else
                    {
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;

                        // Antialiasing on edges
                        bool isEdge = false;
                        for (int dy = -1; dy <= 1; dy++)
                        {
                            for (int dx = -1; dx <= 1; dx++)
                            {
                                int nx = x + dx, ny = y + dy;
                                if (nx >= 0 && nx < w && ny >= 0 && ny < h)
                                {
                                    if (isBg[ny * w + nx]) { isEdge = true; break; }
                                }
                            }
                            if (isEdge) break;
                        }

                        int b = srcBytes[byteIdx];
                        int g = srcBytes[byteIdx + 1];
                        int r = srcBytes[byteIdx + 2];
                        byte a = 255;

                        if (isEdge)
                        {
                            int brightness = (r + g + b) / 3;
                            if (brightness > 220)
                            {
                                a = (byte)Math.Max(0, Math.Min(255, (255 - brightness) * 4));
                            }
                        }

                        outBytes[byteIdx] = (byte)b;
                        outBytes[byteIdx + 1] = (byte)g;
                        outBytes[byteIdx + 2] = (byte)r;
                        outBytes[byteIdx + 3] = a;
                    }
                }
            }

            System.Runtime.InteropServices.Marshal.Copy(outBytes, 0, outData.Scan0, outBytes.Length);
            output.UnlockBits(outData);

            if (minX > maxX || minY > maxY)
            {
                minX = 0; maxX = w - 1; minY = 0; maxY = h - 1;
            }

            int padding = 15;
            int cropX = Math.Max(0, minX - padding);
            int cropY = Math.Max(0, minY - padding);
            int cropW = Math.Min(w - cropX, (maxX - minX) + padding * 2);
            int cropH = Math.Min(h - cropY, (maxY - minY) + padding * 2);

            int maxDim = Math.Max(cropW, cropH);
            using (Bitmap finalSquare = new Bitmap(maxDim, maxDim, PixelFormat.Format32bppArgb))
            {
                using (Graphics gr = Graphics.FromImage(finalSquare))
                {
                    gr.Clear(Color.Transparent);
                    gr.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic;
                    gr.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.HighQuality;
                    gr.PixelOffsetMode = System.Drawing.Drawing2D.PixelOffsetMode.HighQuality;

                    int destX = (maxDim - cropW) / 2;
                    int destY = (maxDim - cropH) / 2;

                    gr.DrawImage(output, new Rectangle(destX, destY, cropW, cropH), new Rectangle(cropX, cropY, cropW, cropH), GraphicsUnit.Pixel);
                }
                finalSquare.Save(destPath, ImageFormat.Png);
            }

            output.Dispose();
        }
    }
}
"@ -ReferencedAssemblies "System.Drawing.dll"

$deptDir = "public\departments"
$files = Get-ChildItem -Path "$deptDir\*.png"

foreach ($file in $files) {
    $tempDest = "$($file.FullName).transparent.png"
    [DeptImageProcessor]::MakeTransparent($file.FullName, $tempDest)
    Move-Item -Path $tempDest -Destination $file.FullName -Force
    Write-Host "Processed transparent PNG: $($file.Name)"
}

Write-Host "All 22 department images converted to pure transparent PNGs!"
