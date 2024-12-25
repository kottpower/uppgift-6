import React, { useEffect, useState } from 'react';
import './Main.css';

/* api */
import Api from '../../api/Api';

/* js obj */
import namedayCountries from '../../data/namedayCountries';

/* utility class */
import DateUtils from '../../utils/DateUtils';


const Main = ({nameDay, date, setNameDay}) => {
  const nameDayObj = nameDay?.nameday;
  const {day,month} = nameDay;

  const [selectedYear, selectedMonth, selectedDay] = date.split('-');

  console.log(nameDayObj)
  console.log(nameDay)

  useEffect(() => {
    //Visar initialt dagens datum :
    document.querySelector('.selected-date').innerHTML = `${createSelectedDateString(date)}`

    const getNameDay = async (date) => {
      const nameDayResponse = await Api.getNameDay(date);
      setNameDay(() => nameDayResponse);
    };
    //Hämtar dagens datum initialt
    getNameDay(date);

  },[])

  useEffect(() => {

    Array.from(document.querySelectorAll('.show-name')).forEach(showName => {
      if(showName.innerText) {
        showName.innerText = 'Klicka här!';
        showName.classList.add('unselected');
      }else {
        showName.innerText = '';
      }
      //Säkerställer att datumet endast uppdateras på skärmen när användare klickat på "sök namnsdagar":
      document.querySelector('.selected-date').innerHTML = `${createSelectedDateString(date)}`

         // Hämta main container som innehåller alla namn och länder
         const mainContainer = document.querySelector('.main');

         // Scrolla containern till toppen varje gång en ny sökning genomförs
         mainContainer.scrollTop = 0;
    })

  },[nameDay])

  const handleClick = async (e,name) => {

    //Inget anrop sker om användaren redan har klickat på "klicka här" tidigare.
    if(e.target.innerText === 'Klicka här!') {
      const personsAge = await Api.getAgify(name)
      e.target.innerHTML = `Uppskattad ålder för <strong>${name}</strong>: ${personsAge.age !== null ? `<span>${personsAge.age} år</span>` : 'Kunde inte beräknas'}`;
      e.target.classList.remove('unselected');
    }
  }

  const createSelectedDateString = (date) => {
      return `${DateUtils.isDateToday(date)}${DateUtils.getSwedishWeekDay(date)} den ${selectedDay.replace(/^0/,'')} ${DateUtils.getSwedishMonth(date)} ${DateUtils.getYear(date)}`
  }


  return (
    <main className='main'>
          <div className="selected-date"></div>
        <ul className='nameDay-list'>
            {nameDayObj ? Object.entries(nameDayObj)
            .sort(([aCountry],[bCountry]) => aCountry === 'se' ? -1 : 0) //Säkerställer att Sverige visas först i listan, ingen sortering i övrigt.
            .map( ([keyCountry, valueName],i) => {
            return<li key={i}>

              <div className="container-left">
                 
                  <div className="nameday-name">
                  <span>Namn:&nbsp;</span>{valueName.split(',')[0]}
                  </div>
                
                  <div className="country-name">
                    <span>Land:&nbsp;</span>{namedayCountries?.[keyCountry] || 'Ej angivet'}
                  </div>

                  <div className='country-flag'>
                  <img
                src={`https://flagcdn.com/24x18/${keyCountry}.png`}
                srcSet={`https://flagcdn.com/48x36/${keyCountry}.png 2x,
                https://flagcdn.com/72x54/${keyCountry}.png 3x`}
                width="24"
                height="18"
                alt={keyCountry}/>
                  </div>
              </div>

              <div className="container-right">
                
                {valueName.split(',')[0] !== 'n/a' ? 
                <div className="show-name unselected" onClick={(e) => handleClick(e,valueName.split(',')[0])}>Klicka här!</div> 
                : <div></div>}
              </div>

            </li>
                 
            }) : ''}
        </ul>
    </main>
  )
}

export default Main
