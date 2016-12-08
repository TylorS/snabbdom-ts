import { VNode, VNodeData, VirtualNode } from '../interfaces';
export interface HyperscriptFn {
    (sel: string): VNode;
    (sel: string, data: VNodeData): VNode;
    (sel: string, children: string | number | Array<string | VNode | null>): VNode;
    (sel: string, data: VNodeData, children: string | number | Array<string | VNode | null>): VNode;
    <T extends Node>(sel: string): VirtualNode<T>;
    <T extends Node>(sel: string, data: VNodeData): VirtualNode<T>;
    <T extends Node>(sel: string, children: string | number | Array<string | VNode | null>): VirtualNode<T>;
    <T extends Node>(sel: string, data: VNodeData, children: string | number | Array<string | VNode | null>): VirtualNode<T>;
}
export declare const h: HyperscriptFn;
