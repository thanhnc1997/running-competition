const template = document.body;
let jsConfetti = new JSConfetti();

const app = {
	common: {
		shuffle(arr) {
			for (let i = arr.length - 1; i > 0; i --) {
				let j = Math.floor(Math.random() * (i + 1));
				[arr[i], arr[j]] = [arr[j], arr[i]];
			}

			return arr;
		}
	},
	loadStudents(students) {
		for (let i in students) {
			let li = document.createElement('li');
			li.classList.add('item');
			li.style.cssText = `top: ${i * 40}px;`;
			li.innerHTML = `
			<div class="image ${students[i].gender == 1 ? 'boy' : 'girl'}"></div>
			<span class="name">${students[i].name}</span>
			`;
			
			template.querySelector('.list').appendChild(li);
		}
	},
	startRace(students) {
		let btnStart = document.querySelector('#start');
		let racers = document.querySelectorAll('.list .item');
		let stadium = document.querySelector('.stadium');
		
		btnStart.addEventListener('click', () => {
			template.querySelector('audio').play();
			template.querySelector('audio').volume = 0.4;
			btnStart.remove();
			racers.forEach((racer, i) => {
				racer.classList.add('run');
				racer.style.cssText = `top: ${i * 40}px; transition: ${students[i].pace}s linear;`;
			});
			stadium.classList.add('start');
			
			setTimeout(() => {
				this.endRace(students);
			}, 14000);
		});
	},
	endRace(students) {
		let first, second, third;
		let finisher = [];
		
		for (let student of students) {
			if (student.position) {
				if (student.position == 1) first = student;
				if (student.position == 2) second = student;
				// if (student.position == 3) third = student;
			}
		}
		
		finisher.push(first, second);
		for (let i = 0; i < finisher.length; i ++) {
			let li = document.createElement('li');
			li.innerHTML = (i + 1) + `. ${finisher[i].name}`;
			template.querySelector('.modal ul').appendChild(li);
		}
		template.querySelector('.modal').style.display = 'block';
		setInterval(() => {
			jsConfetti.addConfetti();
		}, 2000);
	},
	init() {
		let data = this.common.shuffle(students);
		this.loadStudents(data);
		this.startRace(data);
	}
}

app.init();