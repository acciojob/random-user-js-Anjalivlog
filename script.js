//your code here
document.addEventListener('DOMContentLoaded', () => {
	const getUserButton = document.getElementById('getUser');
    const userImage = document.getElementById('user-image');
    const userName = document.getElementById('user-name');
    const additionalInfo = document.getElementById('additional-info');

	let userData = {};

	const fetchUser = async () => {
		try {
			const response = await fetch('https://randomuser.me/api/');
			const data = await response.json();
			const user = data.results[0];
			userData = {
				fullname: `${user.name.first} ${user.name.last}`,
				picture: user.picture.large,
                age: user.dob.age,
                email: user.email,
                phone: user.phone,
			}
			displayUser(userData);
			additionalInfo.textContent = "";
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}
	const displayUser = (user) => {
        userImage.src = user.picture;
        userName.textContent = user.fullName;
    };

    const handleInfoClick = (infoType) => {
        if (userData[infoType]) {
            additionalInfo.textContent = userData[infoType];
        }
    };

    // Event listeners for the buttons
    getUserButton.addEventListener('click', fetchUser);

    document.getElementById('age-btn').addEventListener('click', () => handleInfoClick('age'));
    document.getElementById('email-btn').addEventListener('click', () => handleInfoClick('email'));
    document.getElementById('phone-btn').addEventListener('click', () => handleInfoClick('phone'));

    // Initial user fetch
    fetchUser();
})
