Add-Type -AssemblyName System.Drawing

$images = @(
    @{ Src = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817\simple_01_explore_1788082929319.jpg"; Dest = "c:\office websires\codivia-home\public\journey\step-01.png" },
    @{ Src = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817\simple_02_signup_1788082964256.jpg"; Dest = "c:\office websires\codivia-home\public\journey\step-02.png" },
    @{ Src = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817\simple_03_payment_1788082983672.jpg"; Dest = "c:\office websires\codivia-home\public\journey\step-03.png" },
    @{ Src = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817\simple_04_enrol_1788083006343.jpg"; Dest = "c:\office websires\codivia-home\public\journey\step-04.png" },
    @{ Src = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817\simple_05_workspace_1788083031146.jpg"; Dest = "c:\office websires\codivia-home\public\journey\step-05.png" }
)

foreach ($item in $images) {
    $src = $item.Src
    $dest = $item.Dest
    Write-Host "Processing $src -> $dest"

    $bmp = [System.Drawing.Bitmap]::FromFile($src)
    $width = $bmp.Width
    $height = $bmp.Height

    $outputBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

    $cornerColor = $bmp.GetPixel(5, 5)
    $bgR = $cornerColor.R
    $bgG = $cornerColor.G
    $bgB = $cornerColor.B

    $visited = New-Object 'bool[,]' $width, $height
    $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]

    for ($x = 0; $x -lt $width; $x++) {
        $queue.Enqueue((New-Object System.Drawing.Point($x, 0)))
        $queue.Enqueue((New-Object System.Drawing.Point($x, $height - 1)))
        $visited[$x, 0] = $true
        $visited[$x, $height - 1] = $true
    }
    for ($y = 1; $y -lt $height - 1; $y++) {
        $queue.Enqueue((New-Object System.Drawing.Point(0, $y)))
        $queue.Enqueue((New-Object System.Drawing.Point($width - 1, $y)))
        $visited[0, $y] = $true
        $visited[$width - 1, $y] = $true
    }

    $bgMask = New-Object 'bool[,]' $width, $height

    while ($queue.Count -gt 0) {
        $pt = $queue.Dequeue()
        $px = $pt.X
        $py = $pt.Y

        $c = $bmp.GetPixel($px, $py)
        $diff = [Math]::Max([Math]::Abs([int]$c.R - [int]$bgR), [Math]::Max([Math]::Abs([int]$c.G - [int]$bgG), [Math]::Abs([int]$c.B - [int]$bgB)))
        $brightness = ([int]$c.R + [int]$c.G + [int]$c.B) / 3.0

        if ($diff -lt 28 -or ($brightness -gt 240 -and $diff -lt 45)) {
            $bgMask[$px, $py] = $true

            $neighbors = @(
                (New-Object System.Drawing.Point($px + 1, $py)),
                (New-Object System.Drawing.Point($px - 1, $py)),
                (New-Object System.Drawing.Point($px, $py + 1)),
                (New-Object System.Drawing.Point($px, $py - 1))
            )

            foreach ($n in $neighbors) {
                if ($n.X -ge 0 -and $n.X -lt $width -and $n.Y -ge 0 -and $n.Y -lt $height) {
                    if (-not $visited[$n.X, $n.Y]) {
                        $visited[$n.X, $n.Y] = $true
                        $queue.Enqueue($n)
                    }
                }
            }
        }
    }

    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            if ($bgMask[$x, $y]) {
                $outputBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
            } else {
                $isEdge = $false
                for ($dy = -1; $dy -le 1; $dy++) {
                    for ($dx = -1; $dx -le 1; $dx++) {
                        $nx = $x + $dx
                        $ny = $y + $dy
                        if ($nx -ge 0 -and $nx -lt $width -and $ny -ge 0 -and $ny -lt $height) {
                            if ($bgMask[$nx, $ny]) { $isEdge = $true; break }
                        }
                    }
                    if ($isEdge) { break }
                }

                $c = $bmp.GetPixel($x, $y)
                if ($isEdge) {
                    $brightness = ([int]$c.R + [int]$c.G + [int]$c.B) / 3.0
                    $alpha = [int][Math]::Max(50, [Math]::Min(255, (255 - ($brightness - 180) * 3)))
                    if ($brightness -gt 248) { $alpha = 80 }
                    $outputBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $c.R, $c.G, $c.B))
                } else {
                    $outputBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, $c.R, $c.G, $c.B))
                }
            }
        }
    }

    $minX = $width; $maxX = 0; $minY = $height; $maxY = 0
    for ($y = 0; $y -lt $height; $y++) {
        for ($x = 0; $x -lt $width; $x++) {
            if (-not $bgMask[$x, $y]) {
                if ($x -lt $minX) { $minX = $x }
                if ($x -gt $maxX) { $maxX = $x }
                if ($y -lt $minY) { $minY = $y }
                if ($y -gt $maxY) { $maxY = $y }
            }
        }
    }

    $padding = 24
    $cropX = [Math]::Max(0, $minX - $padding)
    $cropY = [Math]::Max(0, $minY - $padding)
    $cropW = [Math]::Min($width - $cropX, ($maxX - $minX) + ($padding * 2))
    $cropH = [Math]::Min($height - $cropY, ($maxY - $minY) + ($padding * 2))

    $maxDim = [Math]::Max($cropW, $cropH)
    $finalSquare = New-Object System.Drawing.Bitmap($maxDim, $maxDim, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($finalSquare)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    $destX = [int](($maxDim - $cropW) / 2)
    $destY = [int](($maxDim - $cropH) / 2)

    $srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
    $destRect = New-Object System.Drawing.Rectangle($destX, $destY, $cropW, $cropH)
    $g.DrawImage($outputBmp, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $finalSquare.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $finalSquare.Dispose()
    $outputBmp.Dispose()
    $bmp.Dispose()

    Write-Host "Saved: $dest (Size: ${maxDim}x${maxDim})"
}
