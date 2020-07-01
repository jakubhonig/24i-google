const inputField = document.querySelector('#inputField');
const searchForm = document.querySelector('#searchForm');
const webResults = document.querySelector('#webResults');
const imgResults = document.querySelector('#imgResults');
const webPagination = document.querySelector('#webPagination');
const prevPage = document.querySelector('#prevPageBtn');
const nextPage = document.querySelector('#nextPageBtn');

const url = `https://www.googleapis.com/customsearch/v1?key=${config.API_KEY}&cx=${config.CX}&q=`;

let activePage = 1;

async function performSearch(e) {
	if (e && e.type === 'submit') {
		e.preventDefault();
	}

	clearDivs();
	let query = inputField.value;

	let searchUrl = url + query + '&start=' + activePage.toString();
	fetch(searchUrl)
		.then((response) => response.json())
		.then((data) => {
			console.log('Success: ', data);
			for (let i = 0; i < data.items.length; i++) {
				let item = data.items[i];
				let li = document.createElement('li');
				li.setAttribute('id', 'webRes_' + i);

				let a = document.createElement('a');
				a.setAttribute('href', item.link);
				a.setAttribute('target', '_blank');

				let title = document.createTextNode(item.title);
				a.appendChild(title);

				li.appendChild(a);

				webResults.appendChild(li);

				console.log(item);
			}
			// console.log(data.queries.nextPage.startIndex);
		})
		.catch((error) => {
			console.error('Error: ', error);
		});

	let searchUrlImg =
		url + query + '&searchType=image' + '&start=' + activePage.toString();

	fetch(searchUrlImg)
		.then((response) => response.json())
		.then((data) => {
			console.log('Success: ', data);
			for (let i = 0; i < data.items.length; i++) {
				let item = data.items[i];

				let li = document.createElement('li');
				li.setAttribute('id', 'imgRes_' + i);
				let a = document.createElement('a');
				a.setAttribute('href', item.link);
				a.setAttribute('target', '_blank');

				let title = document.createTextNode(item.title);
				a.appendChild(title);

				li.appendChild(a);

				let br = document.createElement('br');
				li.appendChild(br);

				let img = document.createElement('img');
				img.setAttribute('src', item.image.thumbnailLink);
				li.appendChild(img);

				imgResults.appendChild(li);

				console.log(item);
			}
		})
		.catch((error) => {
			console.error('Error: ', error);
		});
}

function goToPrevPage() {
	// set activePage - 10
	// performSearch fnc

	if (activePage !== 1) {
		activePage -= 10;
	}

	console.log(activePage);

	performSearch();
}

function goToNextPage() {
	// set activePage + 10
	// performSearch fnc
	// !!! check for max results no. > can't exceed that

	activePage += 10;

	performSearch();
}

function clearDivs() {
	webResults.innerHTML = '';
	imgResults.innerHTML = '';
}

searchForm.addEventListener('submit', performSearch);
prevPage.addEventListener('click', goToPrevPage);
nextPage.addEventListener('click', goToNextPage);
