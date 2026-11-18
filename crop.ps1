Add-Type -AssemblyName System.Drawing
$srcPath = "C:\Users\GAURAV JANGID\.gemini\antigravity\brain\28d53e39-0a63-44e4-b3a8-2d5f663bddad\.user_uploaded\media_1793467285535_6aab1352.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)

$destDir = "C:\Users\GAURAV JANGID\OneDrive\Pictures\Desktop\Gaurav Website\images"
if (!(Test-Path $destDir)) {
    New-Item -ItemType Directory -Force -Path $destDir | Out-Null
}

function Crop-Image($x, $y, $w, $h, $name) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $targetPath = Join-Path $destDir $name
    $cropped.Save($targetPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Output "Saved $name ($w x $h)"
}

# Hero image
Crop-Image 335 68 347 178 "hero-jewellery.jpg"

# Showroom
Crop-Image 23 258 236 128 "showroom.jpg"

# Categories
Crop-Image 38 473 144 58 "cat-necklaces.jpg"
Crop-Image 192 473 138 58 "cat-bangles.jpg"
Crop-Image 337 473 138 58 "cat-rings.jpg"
Crop-Image 38 553 144 58 "cat-earrings.jpg"
Crop-Image 192 553 138 58 "cat-diamond.jpg"
Crop-Image 337 553 138 58 "cat-bridal.jpg"

# Gallery items
Crop-Image 262 749 92 52 "gallery-1.jpg"
Crop-Image 361 749 92 52 "gallery-2.jpg"
Crop-Image 460 749 92 52 "gallery-3.jpg"
Crop-Image 558 749 92 52 "gallery-4.jpg"

$img.Dispose()
Write-Output "All images cropped successfully!"
