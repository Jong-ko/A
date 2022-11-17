document.addEventListener("DOMContentLoaded", function () {
  let page = 1;

  async function renderResults(pagenum) {
    const searchString = document.getElementsByClassName("search-bar")[0].value;
    const encodedSearchString = encodeURIComponent(searchString);
    const response = await fetch(
      `https://api.artic.edu/api/v1/artworks/search?q=${encodedSearchString}&fields=id,title,artist_title,image_id,style_id,technique_id&page=${pagenum}&limit=16`
    );
    const APIdata = await response.json();
    console.log(APIdata)
    for (let i = 0; i < APIdata.data.length; i++) {
      document.getElementsByClassName("results")[0].innerHTML = renderArt(
        APIdata.data
      );
    }
  }

  const paginate = document.getElementsByClassName(`pageTable`)[0];
  for (var i = 0, len = paginate.children.length; i < len; i++) {
    (function (index) {
      paginate.children[i].onclick = function (e) {
        e.preventDefault();
        page = index + 1;
        renderResults(page);
      };
    })(i);
  }

  const searchQuery = document.getElementById(`search-form`);
  searchQuery.addEventListener("submit", function (e) {
    e.preventDefault();
    page = 1;
    renderResults(page);
  });

  function renderArt(artArray) {
    const artHtmlArray = artArray.map(function (currentArt) {
      if (currentArt.artist_title == null) {
        currentArt.artist_title = "N/A";
      }
      return `<div class="col-sm-3">
      <div class="card card-flip h-100">
      <img src=https://www.artic.edu/iiif/2/${currentArt.image_id}/full/843,/0/default.jpg alt="ArtWork" />
          <div class="card-front text-white bg-dark">
              <div class="card-body">
                  <i class="fa fa-search fa-5x float-right"></i>
                  <h4 class="card-title title">${currentArt.title}</h4>
         <div class="artist">Artist: ${currentArt.artist_title}</div>
              </div>
          </div>
          <div class="card-back bg-white">
              <div class="card-body">
                <h4>${currentArt.style_id}</h4>
                <h4>${currentArt.technique_id}</h4>
                <h4>${currentArt.style_id}</h4>
                <h4>${currentArt.style_id}</h4>
                  <a href="#" class="btn btn-outline-secondary">Learn More</a>
              </div>
          </div>
      </div>
  </div>`;

      //   `<div class="art card m-1" style="width: 18rem";>
      //   <img src=https://www.artic.edu/iiif/2/${currentArt.image_id}/full/843,/0/default.jpg alt="ArtWork" />
      //   <div class="card-body">
      //     <h4 class="card-title title">${currentArt.title}</h4>
      //     <div class="artist">Artist: ${currentArt.artist_title}</div>
      //     <button class="add-button" data-imdbid=${currentArt.imdbID}>Learn More</button>
      //   </div>
      // </div>`;

      //   `
      //   <!-- Rotating card -->
      //   <div class="card-wrapper">
      //     <div id="card-1" class="card card-rotating text-center">

      //       <!-- Front Side -->
      //       <div class="face front">

      //         <!-- Image-->
      //         <div class="card-up">
      //           <img src=https://www.artic.edu/iiif/2/${currentArt.image_id}/full/843,/0/default.jpg alt="ArtWork">
      //         </div>

      //         <!-- Content -->
      //         <div class="card-body">
      //         <h4 class="card-title title">${currentArt.title}</h4>
      //                 <div class="artist">Artist: ${currentArt.artist_title}</div>
      //           <!-- Triggering button -->
      //           <a class="rotate-btn" data-card="card-1"><i class="fas fa-redo-alt"></i> Click for more information</a>
      //         </div>
      //       </div>
      //       <!-- Front Side -->

      //       <!-- Back Side -->
      //       <div class="face back">
      //         <div class="card-body">

      //           <!-- Content -->
      //           <h4 class="font-weight-bold mb-0">About me</h4>
      //           <hr>
      //           <p>
      //             Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat tenetur odio suscipit non commodi vel
      //             eius veniam maxime?
      //             <hr>
      //             <!-- Social Icons -->
      //             <ul class="list-inline py-2">
      //               <li class="list-inline-item"><a class="p-2 fa-lg fb-ic"><i class="fab fa-facebook-f"></i></a></li>
      //               <li class="list-inline-item"><a class="p-2 fa-lg tw-ic"><i class="fab fa-twitter"></i></a></li>
      //               <li class="list-inline-item"><a class="p-2 fa-lg gplus-ic"><i class="fab fa-google-plus-g"></i></a></li>
      //               <li class="list-inline-item"><a class="p-2 fa-lg li-ic"><i class="fab fa-linkedin-in"></i></a></li>
      //             </ul>
      //             <!-- Triggering button -->
      //             <a class="rotate-btn" data-card="card-1"><i class="fas fa-undo"></i> Click here to rotate back</a>

      //         </div>
      //       </div>
      //       <!-- Back Side -->

      //     </div>
      //   </div>
      //   <!-- Rotating card -->`
    });
    return artHtmlArray.join("");
  }
});
