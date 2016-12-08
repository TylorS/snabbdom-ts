declare const is: {
    array: (arg: any) => arg is any[];
    primitive(x: any): boolean;
};
export default is;
