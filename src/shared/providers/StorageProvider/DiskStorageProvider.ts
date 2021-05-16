import fs from 'fs';
import path from 'path';
import uploadConfig from '../../../config/upload';

class DiskStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.directory, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, file);

    try {
      await fs.promises.stat(file);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
