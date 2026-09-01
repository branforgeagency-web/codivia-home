Add-Type -AssemblyName System.Drawing

$brainDir = "C:\Users\kowsi\.gemini\antigravity\brain\73322865-1962-4176-97b7-3cc5cc041817"
$destDir = "public\departments"

# 1. Map of newly generated 12 high-res 3D icons
$newImages = @{
    "cardiology.png"      = "$brainDir\dept_cardiology_1788235046928.jpg"
    "orthopedics.png"     = "$brainDir\dept_orthopedics_1788235064456.jpg"
    "radiology.png"       = "$brainDir\dept_radiology_1788235281591.jpg"
    "emergency.png"       = "$brainDir\dept_emergency_1788235300200.jpg"
    "general-surgery.png" = "$brainDir\dept_gen_surgery_1788235333343.jpg"
    "oncology.png"        = "$brainDir\dept_oncology_1788235355777.jpg"
    "obgyn.png"           = "$brainDir\dept_obgyn_1788235375728.jpg"
    "pediatrics.png"      = "$brainDir\dept_pediatrics_1788235394188.jpg"
    "neurology.png"       = "$brainDir\dept_neurology_1788235412998.jpg"
    "dermatology.png"     = "$brainDir\dept_dermatology_1788235452560.jpg"
    "gastroenterology.png"= "$brainDir\dept_gastro_1788235473597.jpg"
    "pulmonology.png"     = "$brainDir\dept_pulmonology_1788235493635.jpg"
}

foreach ($destName in $newImages.Keys) {
    $src = $newImages[$destName]
    if (Test-Path $src) {
        $bmp = [System.Drawing.Bitmap]::FromFile($src)
        $destPath = "$destDir\$destName"
        $bmp.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $bmp.Dispose()
        Write-Host "Updated with newly generated 3D model: $destName"
    }
}

# 2. For the remaining 10 department icons, remove any text in the top 35%
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
        
        # Crop out the top 28% where any text header resides
        $topCut = [int]($h * 0.28)
        $newH = $h - $topCut
        
        $rect = New-Object System.Drawing.Rectangle(0, $topCut, $w, $newH)
        $cropped = New-Object System.Drawing.Bitmap($w, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        $g = [System.Drawing.Graphics]::FromImage($cropped)
        $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.DrawImage($bmp, (New-Object System.Drawing.Rectangle(0, 0, $w, $newH)), $rect, [System.Drawing.GraphicsUnit]::Pixel)
        $g.Dispose()
        $bmp.Dispose()
        
        $temp = "$path.tmp.png"
        $cropped.Save($temp, [System.Drawing.Imaging.ImageFormat]::Png)
        $cropped.Dispose()
        Move-Item -Path $temp -Destination $path -Force
        Write-Host "Cropped text cleanly from remaining icon: $r"
    }
}

Write-Host "All 22 department images updated!"
