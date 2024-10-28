function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

  const dayOfWeek = daysOfWeek[now.getDay()];
  const day = String(now.getDate()).padStart(2, '0');
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const fullDate = `${day} de ${month} de ${year}`;

  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  document.getElementById('dayOfWeek').textContent = dayOfWeek;
  document.getElementById('fullDate').textContent = fullDate;
}

function updateLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then(response => response.json())
          .then(data => {
            const location = data.address.city || data.address.town || data.address.village || "Localização desconhecida";
            document.getElementById('location').textContent = location;
          })
          .catch(() => {
            document.getElementById('location').textContent = "Localização não disponível";
          });
      },
      () => {
        document.getElementById('location').textContent = "Localização desativada";
      }
    );
  } else {
    document.getElementById('location').textContent = "Geolocalização não suportada";
  }
}

setInterval(updateClock, 1000);

updateClock();
updateLocation();
