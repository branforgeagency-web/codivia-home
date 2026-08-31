Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\kowsi\.gemini\antigravity\brain\3394320b-df27-4403-9091-055e3b76b053\dept_icons_grid_1787888184521.jpg"
$outDir = "public\departments"

if (-not (Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir -Force | Out-Null
}

$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $img.Width
$height = $img.Height

Write-Host "Grid Image Size: ${width}x${height}"

# Exact column and row centers (in 1024x1024 coordinates)
$colCenters = @(125, 317, 509, 701, 893)
$rowCenters = @(126, 318, 510, 702, 888)

# Exact size of the rounded square icon (excluding text labels below)
$boxSize = 168

$deptKeys = @(
    "cardiology", "orthopedics", "radiology", "emergency", "neurology",
    "oncology", "pediatrics", "general-surgery", "ophthalmology", "dermatology",
    "pulmonology", "gastroenterology", "urology", "endocrinology", "nephrology",
    "ent", "infectious-disease", "anesthesiology", "pmr", "psych",
    "obgyn", "ambulatory"
)

$half = [int]($boxSize / 2)

for ($i = 0; $i -lt $deptKeys.Length; $i++) {
    $r = [Math]::Floor($i / 5)
    $c = $i % 5

    $cx = $colCenters[$c]
    $cy = $rowCenters[$r]

    $x = [Math]::Max(0, [int]($cx - $half))
    $y = [Math]::Max(0, [int]($cy - $half))

    # Clamp
    if ($x + $boxSize -gt $width) { $x = $width - $boxSize }
    if ($y + $boxSize -gt $height) { $y = $height - $boxSize }

    $rect = New-Object System.Drawing.Rectangle($x, $y, $boxSize, $boxSize)
    $cropped = New-Object System.Drawing.Bitmap($boxSize, $boxSize)
    $g = [System.Drawing.Graphics]::FromImage($cropped)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.DrawImage($img, (New-Object System.Drawing.Rectangle(0, 0, $boxSize, $boxSize)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
    $g.Dispose()

    $key = $deptKeys[$i]
    $dest = Join-Path $outDir "$key.png"
    $cropped.Save($dest, [System.Drawing.Imaging.ImageFormat]::Png)
    $cropped.Dispose()
    Write-Host "Precisely Centered: $dest"
}

$img.Dispose()

# Also copy to src/assets/departments
$assetDir = "src\assets\departments"
if (-not (Test-Path $assetDir)) {
    New-Item -ItemType Directory -Path $assetDir -Force | Out-Null
}
Copy-Item "public\departments\*" $assetDir -Force

Write-Host "All 22 icons cropped with exact mathematical centering!"
