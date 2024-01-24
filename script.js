
document.addEventListener('DOMContentLoaded', function () {
  // Initialize the calendar
  $('#calendar').fullCalendar({
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month, agendaTwoWeeks, agendaWeek,agendaDay'
    },
    defaultView: 'month',
    views: {
      agendaTwoWeeks: {
        type: 'agenda',
        duration: { weeks: 2 },
        buttonText: '2 weeks',
        dayHeaderContent: function (date) {
          const dayOfMonth = date.format('D');
          const weatherInfo = getWeatherInfo(date); // Fetch weather information
          return `<div>${dayOfMonth}<br>High: ${weatherInfo.highTemp}° | Low: ${weatherInfo.lowTemp}°<br>${weatherInfo.rain ? 'Rain' : ''}</div>`;
        }
      }
    },
    
    events: '/api/events'  // Use the endpoint to fetch events

    //events: [], // Add your events data here


});
async function getWeatherInfo(date) {
  const apiKey = '4e0ad2b3913204163df56d814cdd596f';
  const latitude = '35.3185774';
  const longitude = '-97.512071';
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${apiKey}`;

  try {
    // Fetch weather information from OpenWeatherMap API
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    
    // Extract relevant weather information for the given date
    const dailyWeather = weatherData.daily.find(day => date.isSame(moment.unix(day.dt), 'day'));
    
    // Check if it's going to rain
    const rain = dailyWeather && dailyWeather.rain && dailyWeather.rain > 0;

    return {
      highTemp: dailyWeather ? dailyWeather.temp.max : '',
      lowTemp: dailyWeather ? dailyWeather.temp.min : '',
      rain: rain
    };
  } catch (error) {
    console.error(error);
    return {
      highTemp: '',
      lowTemp: '',
      rain: false
    };
  }
}
});

// Sample data structure for events
let events = [];

// Function to switch between views
function switchView(view) {
  // Implement logic to switch between views
  console.log(`Switching to ${view} view`);
}

// Function to add an event
function addEvent() {
  const date = document.getElementById('date').value;
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  // Validate form fields
  if (!date || !name || !address || !phone) {
    alert('Please fill in all fields.');
    return;
  }

  const event = { date, name, address, phone };
  events.push(event);

  // Update event display
  displayEvents();

  // Clear form fields
  document.getElementById('eventForm').reset();
}


// Function to display events
function displayEvents(events) {
  const eventDisplay = document.getElementById('eventDisplay');
  
  if (eventDisplay) {
  eventDisplay.innerHTML = '';

  

  events.forEach((event) => {
    const eventItem = document.createElement('div');
    eventItem.innerHTML = `
      <p>Date: ${event.date}</p>
      <p>Name: ${event.name}</p>
      <p>Address: ${event.address}</p>
      <p>Phone: ${event.phone}</p>
    `;
    eventDisplay.appendChild(eventItem);
  });
}
}

// Initial display of events
displayEvents();
