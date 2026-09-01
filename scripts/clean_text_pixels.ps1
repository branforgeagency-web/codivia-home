Add-Type -AssemblyName System.Drawing

$deptDir = "public\departments"
$files = Get-ChildItem -Path "$deptDir\*.png"

foreach ($file in $files) {
    $srcPath = $file.FullName
    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $w = $bmp.Width
    $h = $bmp.Height

    # We create an editable bitmap
    $cleaned = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cleaned)
    $g.Clear([System.Drawing.Color]::White)
    $g.DrawImage($bmp, 0, 0, $w, $h)
    $g.Dispose()
    $bmp.Dispose()

    # The text is strictly in the top 35% of the image.
    # In the top 35%, any non-white/dark text pixels (letters) can be erased to pure white
    # Or we can clear the top row where text exists.
    # Let's inspect the top 32% of height:
    $textZoneHeight = [int]($h * 0.30)

    for ($y = 0; $y -lt $textZoneHeight; $y++) {
        for ($x = 0; $x -lt $w; $x++) {
            $pixel = $cleaned.GetPixel($x, $y)
            # If it's dark (text letter) or near-black/gray:
            $isDark = ($pixel.R -lt 180 -and $pixel.G -lt 180 -and $pixel.B -lt 180)
            if ($isDark) {
                # Erase to pure white
                $cleaned.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 255, 255, 255))
            }
        }
    }

    # Save to temp and overwrite
    $tempPath = "$srcPath.cleaned.png"
    $cleaned.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cleaned.Dispose()
    
    Move-Item -Path $tempPath -Destination $srcPath -Force
    Write-Host "Cleaned text from: $($file.Name)"
}

Write-Host "All 22 images completely purged of text!"
