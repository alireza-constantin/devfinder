const searchTerm = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const errorMsg = document.getElementById('error-msg');
const searchBar = document.querySelector('.search-bar');
const card = document.getElementById('card');

const getdata = async (term) => {
	let data;
	try {
		const res = await axios.get(`https://api.github.com/users/${term}`);
		if (res) {
			data = res.data;
		}
	} catch (error) {
		return {
			msg: error.response.data.message,
		};
	}

	if (data) {
		return {
			avatar:
				data.avatar_url || 'https://avatars.githubusercontent.com/u/583231?v=4',
			bio: data.bio || 'This profile has no bio',
			blog: data.blog || 'Not available',
			company: data.company || 'Not available',
			date: data.created_at,
			followers: data.followers,
			following: data.following,
			location: data.location || 'Not available',
			id: data.login,
			name: data.name,
			repos: data.public_repos,
			twitter: data.twitter_username || 'Not available',
		};
	}
};

searchBtn.addEventListener('click', async () => {
	const { msg, ...data } = await getdata(searchTerm.value);

	if (msg) {
		return UIShowError(msg);
	}

	UIHideError();
	card.innerHTML = showCard(data);
});

const UIShowError = (msg) => {
	errorMsg.classList.add('show');
	searchBar.classList.add('error');
	errorMsg.firstElementChild.innerText = msg;
};

const UIHideError = () => {
	errorMsg.classList.remove('show');
	searchBar.classList.remove('error');
};

const showCard = (data) => {
	const date = data.date.slice(0, 10).split('-').reverse().join(' ');
	return `
		
			<div class="ctr">
				<div class="profile">
					<div class="img">
						<img
							src=${data.avatar}
							alt=""
						/>
					</div>
					<div class="bio-info">
						<div class="name-id">
							<h1 class="name">${data.name}</h1>
							<p>@<span class="id">${data.id}</span></p>
						</div>
						<div class="date">
							<p>Joined ${date}</p>
						</div>
					</div>
					<div class="bio">
						${data.bio}
					</div>
				</div>
				<div class="stats">
					<div class="ctr">
						<div class="repo">
							<p>Repos</p>
							<p class="nums">${data.repos}</p>
						</div>
						<div class="followers">
							<p>Followers</p>
							<p class="nums">${data.followers}</p>
						</div>
						<div class="following">
							<p>Following</p>
							<p class="nums">${data.following}</p>
						</div>
					</div>
				</div>
				<div class="info">
					<div class="location">
						<i class="fas fa-map-marker-alt"></i>
						<span> ${data.location}</span>
					</div>
					<div class="twitter">
						<i class="fab fa-twitter"></i>
						<span> ${data.twitter}</span>
					</div>
					<div class="blog">
						<i class="fas fa-link"></i>
						<a href="${data.blog !== 'Not available' ? data.blog : '#'}"> ${data.blog}</a>
					</div>
					<div class="workplace">
						<i class="fas fa-building"></i>
						<span> ${data.company}</span>
					</div>
				</div>
			</div>
	`;
};

// Changing Theme
const lightBtn = document.getElementById('light-btn');

lightBtn.addEventListener('click', () => {
	document.body.classList.toggle('light');
	if(lightBtn.innerText.trim() = 'LIGHT') {
		lightBtn.innerText = 'DARK'
	} else { 
		lightBtn.innerText = 'LIGHT'
	}
		
	
});
