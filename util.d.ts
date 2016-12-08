import { VNode } from './interfaces';
export declare function isDef(x: any): boolean;
export declare function isUndef(x: any): boolean;
export declare function sameVNode(vNode1: VNode, vNode2: VNode): boolean;
export declare function createKeyToOldIdx(children: VNode[], beginIdx: number, endIdx: number): any;
