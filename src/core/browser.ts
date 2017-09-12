export module Browser {
    export const h = window.history;
    export interface HeadInfo {
        type?: string; // 0
        viewId?: string; // 1
        holderId?: string; // 2
        title?: string; // 3
        pushState?: boolean; // 4
        activeViews?: Array<string>; // 5
        preRequire?: Array<string>; // 6
        posRequire?: Array<string>; // 7
        viewTypes?: Array<string>; // 8
    }
    export interface ViewInfo {
        
    }
    export async function go(url: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }
    export function initialize() {

    }
}
// state controller 
export module Browser {
    export module State {
        export function push() {

        }
        export function replace() {

        }
    }
}