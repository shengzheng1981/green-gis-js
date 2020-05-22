
export enum FieldType {
    String = 0,
    Number = 1,
}

export class Field {
    name: string;
    alias: string;
    type: FieldType;
    
}