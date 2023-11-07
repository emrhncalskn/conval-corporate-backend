export class FileTypeConstant {
    static readonly IMAGE = /(jpg|png|jpeg)$/;
    static readonly DOCUMENT = /(docx|pdf|xlsx)$/;
}

export class FileDestinationConstant {
    static readonly DEST = './assets/files/uploads/';
    static readonly OLD_PATH = './assets/files/uploads/';
    static readonly NEW_PATH = 'assets/files/uploads';
}