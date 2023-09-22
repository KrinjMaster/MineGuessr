declare global {
	namespace App {
	}
}

declare module 'three' {

}

declare module "*.svg" {
  const content: SVGElement;
  export default content;
}

declare module '$lib/lang' {

}

export { };
