Add-Type -AssemblyName System.Drawing

$deptDir = "public\departments"
$files = Get-ChildItem -Path "$deptDir\*.png"

Write-Host "Found $($files.Count) department images to crop."

foreach ($file in $files) {
    $srcPath = $file.FullName
    $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
    $w = $bmp.Width
    $h = $bmp.Height

    # The text is located in the top 20% of the image.
    # We crop starting from 20% of height down to the bottom.
    $topOffset = [int]($h * 0.20)
    $cropHeight = $h - $topOffset
    
    $cropRect = New-Object System.Drawing.Rectangle(0, $topOffset, $w, $cropHeight)
    
    # Create new transparent canvas
    $cropped = New-Object System.Drawing.Bitmap($w, $cropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.Clear([System.Drawing.Color]::Transparent)
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $w, $cropHeight)
    $g.DrawImage($bmp, $destRect, $cropRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $bmp.Dispose()
    
    # Save to temp and replace
    $tempPath = "$srcPath.tmp.png"
    $cropped.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    
    Move-Item -Path $tempPath -Destination $srcPath -Force
    Write-Host "Cropped text from: $($file.Name) (New size: ${w}x${cropHeight})"
}

Write-Host "All department images successfully cropped with top text removed!"
