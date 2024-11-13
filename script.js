//your code here
const processImage = () => {
			const fileInput = document.getElementById('imageInput');
			const file = fileInput.files[0];

			// Validate if an image has been selected
			if (!file) {
				alert('Please select an image to process');
				return;
			}

			// Display the original image
			const originalImage = document.getElementById('originalImage');
			originalImage.src = URL.createObjectURL(file);

			// Imagga API for color extraction (API_KEY and API_SECRET must be replaced with actual values)
			const apiKey = 'your_api_key';
			const apiSecret = 'your_api_secret';
			const url = 'https://api.imagga.com/v2/colors';

			const formData = new FormData();
			formData.append('image', file);

			// Making the API request
			fetch(url, {
				method: 'POST',
				body: formData,
				headers: {
					'Authorization': 'Basic ' + btoa(apiKey + ':' + apiSecret)
				}
			})
			.then(response => {
				// Check if the response is OK (status code 200-299)
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then(data => {
				// Check if color information exists
				if (data.result && data.result.colors && data.result.colors.image_colors) {
					const colorInfo = data.result.colors.image_colors;

					// Display the processed color palette
					const processedImage = document.getElementById('processedImage');
					processedImage.style.backgroundColor = colorInfo[0].closest_palette_color_html;
					processedImage.alt = 'Closest Color: ' + colorInfo[0].closest_palette_color;

					// Display color information
					document.getElementById('colorInfo').textContent = `Closest color: ${colorInfo[0].closest_palette_color}`;
				} else {
					throw new Error('No color information returned');
				}
			})
			.catch(error => {
				console.error('Error processing image:', error);
				alert('Error processing the image. Please try again.');
			});
		};