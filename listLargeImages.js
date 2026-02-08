// index.js
// 功能：列出 images 文件夹中所有大小超过 2MB 的图片

const fs = require('fs');
const path = require('path');

// 定义图片文件夹路径
const imagesDir = path.join(__dirname, 'images');

// 2MB 的字节数阈值
const SIZE_THRESHOLD = 2 * 1024 * 1024; // 2097152 字节

// 支持的图片文件扩展名（可自行扩展）
const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp', '.svg'];

/**
 * 检查文件是否为图片
 * @param {string} fileName - 文件名
 * @returns {boolean}
 */
function isImageFile(fileName) {
    const ext = path.extname(fileName).toLowerCase();
    return imageExtensions.includes(ext);
}

/**
 * 主函数：读取文件夹并筛选大于 2MB 的图片
 */
function listLargeImages() {
    try {
        // 读取 images 文件夹下的所有条目
        const files = fs.readdirSync(imagesDir);
        const largeImages = [];

        files.forEach(file => {
            const filePath = path.join(imagesDir, file);
            const stats = fs.statSync(filePath);

            // 只处理文件（排除子目录）
            if (stats.isFile() && isImageFile(file)) {
                if (stats.size > SIZE_THRESHOLD) {
                    largeImages.push(file);
                }
            }
        });

        if (largeImages.length > 0) {
            console.log('以下图片大小超过 2MB:');
            largeImages.forEach(name => console.log('- ' + name));
        } else {
            console.log('未发现大小超过 2MB 的图片。');
        }

    } catch (error) {
        console.error('读取文件夹时出错:', error.message);
    }
}

// 执行函数
listLargeImages();
