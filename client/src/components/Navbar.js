import * as React from "react";

export default function MyComponent() {
  return (
    <div className="bg-stone-300 flex max-w-full items-stretch justify-between gap-5 pl-9 ml-5 mt-5 mr-5 pr-12 py-4 rounded-xl shadow-sm">
      <img
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/814bff97c014a53b59ec63451721010dc2b8c66e6981c4dacd347bf76fa678a2?apiKey=8a8c9825f917431a9690a62eb8ddd157&"
        className="aspect-square object-contain object-center w-[35px] overflow-hidden shrink-0 max-w-full rounded-[50%]"
        alt='logo'
      />
      
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e71cf577c61af225b4efb4c3fccc3973733483fc1684cf914ee63d1fbc51edb?apiKey=8a8c9825f917431a9690a62eb8ddd157&"
        className="aspect-square object-contain object-center w-6 overflow-hidden self-center shrink-0 max-w-full my-auto"
        alt='hamburger'
      />
       
    </div>
   
  );
}


