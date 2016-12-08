import { Module, SnabbdomAPI, VNode } from './interfaces';
export declare function init(modules: Module[], api?: SnabbdomAPI<any, any, any>): (previous: VNode | Node, current: VNode) => VNode;
