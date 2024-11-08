import fs from 'fs'
import path from 'path'

// Function to get the files from a directory and sort themm
function getSortedFiles(dir) {
    return new Promise((resolve, reject) => {
        fs.readdir(dir, (err, files) => {
            if (err) {
                return reject(err);
            }

            let fileDetails = [];

            files.forEach(file => {
                const filePath = path.join(dir, file);
                const stats = fs.statSync(filePath);

                fileDetails.push({
                    fileName: file,
                    modifiedDate: stats.ctime
                });
            });

            fileDetails.sort((a, b) => b.modifiedDate - a.modifiedDate);

            resolve(fileDetails);
        });
    });
}

// Function to save JSON data to a file
function saveJsonToFile(data, filePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

// Main function to generate and save the sorted files list
async function generateSortedFilesJson(dir, outputFilePath) {
    try {
        const sortedFiles = await getSortedFiles(dir);
        await saveJsonToFile(sortedFiles, outputFilePath);
        console.log('JSON file has been saved.');
    } catch (error) {
        console.error('Error:', error);
    }
}

// Replace 'your_directory_path' with the path to your directory
const directoryPath = './public/jsons';
// Replace 'output_file_path.json' with the desired output file path
const outputFilePath = './public/output_file_path.json';

// Generate the sorted files JSON and save it
generateSortedFilesJson(directoryPath, outputFilePath);

