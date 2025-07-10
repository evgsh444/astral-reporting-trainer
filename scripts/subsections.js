function loadSubsections() {
    return fetch('subsections.json').then(res => res.json());
  }
  
  function renderSubsections(parentId) {
    loadSubsections().then(data => {
      const item = data.find(obj => obj.id === parentId);
      if (!item) {
        document.body.innerHTML = '<h2>Раздел не найден</h2>';
        return;
      }
      document.querySelector('.header-bottom-text').textContent = item.title;
      const cardGrid = document.querySelector('.card-grid');
      item.subsections.forEach(sub => {
                const card = document.createElement('div');
                card.classList.add('card');
                cardGrid.appendChild(card);

                const cardButton = document.createElement('button');
                cardButton.classList.add('card-button');
                cardButton.textContent = sub.title;
                cardButton.setAttribute('data-id', sub.id);

                card.appendChild(cardButton);

                cardButton.addEventListener('click', () =>{
                    goToScenarioPage(sub.id);
                });

      });

      const exitCard = document.createElement('div');
      exitCard.classList.add('card');
      cardGrid.appendChild(exitCard);

      const exitCardButton = document.createElement('button');
      exitCardButton.classList.add('exit-card-button');
      exitCardButton.addEventListener('click', () => {
        window.location.href = "index.html";
      });
      const img = document.createElement('img');
      img.src = '../assets/icons/exitButton.svg';
      img.alt = 'Выход';
      img.style.width = '24px';
      img.style.height = '24px';
      img.style.marginRight = '10px'; 
      exitCardButton.appendChild(img);
      exitCardButton.appendChild(document.createTextNode('Вернуться к началу'));
      exitCard.appendChild(exitCardButton);
    });
  }

  function goToScenarioPage(scenarioId) {
    if (scenarioId) {
      window.location.href = 'scenariopage.html?id=' + scenarioId;
    }
  }


  
