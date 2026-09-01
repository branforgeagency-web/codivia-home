Add-Type -AssemblyName System.Drawing

$destDir = "public\departments"
$remaining = @(
    "nephrology.png", "endocrinology.png", "urology.png", "ent.png",
    "ophthalmology.png", "psych.png", "anesthesiology.png", "pmr.png",
    "infectious-disease.png", "ambulatory.png"
)

foreach ($r in $remaining) {
    $path = "$destDir\$r"
    if (Test-Path $path) {
        $bmp = [System.Drawing.Bitmap]::FromFile($path)
        $w = $bmp.Width
        $h = $bmp.Height
        
        # Crop from y = 16 to remove any artifact at top
        $topCut = [int]($h * 0.16)
        $cropH = $h - $topCut
        
        $rect = New-Object System.Drawing.Rectangle(0, $topCut, $w, $cropH)
        
        # Create 200x200 square canvas
        $canvasSize = [Math]::Max($w, $cropH) + 20
        $square = New-Object System.Drawing.Bitmap($canvasSize, $canvasSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($square)
        $g.Clear([System.Drawing.Color]::White)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        
        $destX = [int](($canvasSize - $w) / 2)
        $destY = [int](($canvasSize - $cropH) / 2)
        
        $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle($destX, $destY, $w, $cropH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $bmp.Dispose()
        
        $temp = "$path.clean.png"
        $square.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
        $square.Dispose()
        Move-Item -Path $temp -Destination $path -Force
        Write-Host "Processed square icon: $r"
    }
}
