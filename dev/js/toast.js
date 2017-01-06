function Toast(text, time=Toast.SHORT) {

	const cont = document.getElementById('toast-container');
	const chil = document.createElement('div');
	chil.className = 'toast';
	chil.innerHTML = `<p>${text}</p>`;

	cont.appendChild(chil);

	setTimeout(()=>{
		chil.remove();
	}, time);

}

Toast.LONG	= 6000;
Toast.SHORT	= 3200;