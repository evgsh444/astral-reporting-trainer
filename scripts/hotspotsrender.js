// Функция создания маскота
function createMascot(position, align, mascotPosition) {
    const mascot = document.createElement('img');
    mascot.className = 'tooltip-mascot';
    
    // Определяем позицию маскота и выбираем изображение
    let mascotClass = '';
    let mascotSrc = '';
    
    // Определяем оптимальную позицию маскота на основе позиции тултипа
    let optimalMascotPosition = mascotPosition;
    
    if (!optimalMascotPosition) {
        // Автоматически определяем лучшую позицию для маскота
        if (position === 'right') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        } else if (position === 'left') {
            optimalMascotPosition = 'right'; // Маскот справа от тултипа
        } else if (position === 'top') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        } else if (position === 'bottom') {
            optimalMascotPosition = 'left'; // Маскот слева от тултипа
        }
    }
    
    // Выбираем изображение и класс в зависимости от позиции
    if (optimalMascotPosition === 'left') {
        mascotClass = 'tooltip-mascot-left';
        mascotSrc = 'assets/icons/mascotRight.svg'; // Смотрит вправо (к тултипу)
    } else if (optimalMascotPosition === 'right') {
        mascotClass = 'tooltip-mascot-right';
        mascotSrc = 'assets/icons/mascotLeft.svg'; // Смотрит влево (к тултипу)
    }
    
    mascot.classList.add(mascotClass);
    mascot.src = mascotSrc;
    mascot.alt = 'Mascot';
    mascot.dataset.position = optimalMascotPosition;
    
    // Функция для анимации маскота при изменении позиции
    mascot.animateTo = function(newPosition, newAlign, newMascotPosition) {
        mascot.classList.add('tooltip-mascot-animating');
        setTimeout(() => {
            // Обновляем позицию и изображение
            const newOptimalPosition = newMascotPosition || 
                (newPosition === 'right' ? 'left' : 
                 newPosition === 'left' ? 'right' : 'left');
            
            mascot.className = 'tooltip-mascot';
            if (newOptimalPosition === 'left') {
                mascot.classList.add('tooltip-mascot-left');
                mascot.src = 'assets/icons/mascotRight.svg';
            } else {
                mascot.classList.add('tooltip-mascot-right');
                mascot.src = 'assets/icons/mascotLeft.svg';
            }
            mascot.dataset.position = newOptimalPosition;
            
            setTimeout(() => {
                mascot.classList.remove('tooltip-mascot-animating');
            }, 350);
        }, 200);
    };
    
    return mascot;
}

function addHotspot(hs) {
    const container = document.querySelector('.hotspot-container');
    const hotspotDiv = document.createElement('div');
    hotspotDiv.className = 'hotspot';
    hotspotDiv.style.pointerEvents = 'auto';
    hotspotDiv.style.left = hs.xPercent + "%";
    hotspotDiv.style.top = hs.yPercent + "%";
    hotspotDiv.style.width = hs.width + "%";
    hotspotDiv.style.height = hs.height + "%";

    // Для анимации перемещения хотспота
    hotspotDiv.animateTo = function(newHs, cb) {
        hotspotDiv.classList.add('hotspot-animating');
        hotspotDiv.style.left = newHs.xPercent + "%";
        hotspotDiv.style.top = newHs.yPercent + "%";
        hotspotDiv.style.width = newHs.width + "%";
        hotspotDiv.style.height = newHs.height + "%";
        setTimeout(() => {
            hotspotDiv.classList.remove('hotspot-animating');
            if (cb) cb();
        }, 350);
    };



    
    const position = hs.tooltipPosition || 'top'; // top, bottom, left, right
    const align = hs.tooltipAlign || 'center'; // start, center, end
    const text = hs.tooltipText || 'Tooltip'; // Текст тултипа

    // Классы для тултипа и стрелки
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip-${position} tooltip-${position}-${align}`;
    tooltip.innerHTML = text; // Изменено с textContent на innerHTML
    tooltip.dataset.position = position;
    tooltip.dataset.align = align;
    tooltip.style.position = 'absolute';

    // Для анимации тултипа
    tooltip.animateTo = function(newHs, newPosition, newAlign, cb, newText, newTitle) {
        tooltip.classList.add('tooltip-animating', 'tooltip-hide-arrow');
        
        // Анимируем маскота если он есть
        const mascot = hotspotDiv.querySelector('.tooltip-mascot');
        if (mascot && mascot.animateTo) {
            mascot.animateTo(newPosition, newAlign, hs.mascotPosition);
        }
        
        setTimeout(() => {
            positionTooltip(newHs, newPosition, newAlign);
            // Меняем текст и заголовок
            if (typeof newText === 'string') {
                const p = tooltip.querySelector('p');
                if (p) p.innerHTML = newText; // Изменено с textContent на innerHTML
            }
            if (typeof newTitle === 'string') {
                const t = tooltip.querySelector('.tooltip-title');
                if (t) t.textContent = newTitle;
            }
            // Меняем классы для стрелки
            tooltip.className = `tooltip tooltip-${newPosition} tooltip-${newPosition}-${newAlign} tooltip-animating tooltip-hide-arrow`;
            setTimeout(() => {
                tooltip.classList.remove('tooltip-animating', 'tooltip-hide-arrow');
                if (cb) cb();
            }, 350);
        }, 200);
    };
    let arrowClass = '';
    if (position === 'top') {
        if (align === 'start') arrowClass = 'tooltip-arrow-bottom-left';
        else if (align === 'end') arrowClass = 'tooltip-arrow-bottom-right';
        else arrowClass = 'tooltip-arrow-bottom-center';
    } else if (position === 'bottom') {
        if (align === 'start') arrowClass = 'tooltip-arrow-top-left';
        else if (align === 'end') arrowClass = 'tooltip-arrow-top-right';
        else arrowClass = 'tooltip-arrow-top-center';
    } else if (position === 'left') {
        if (align === 'start') arrowClass = 'tooltip-arrow-right-top';
        else if (align === 'end') arrowClass = 'tooltip-arrow-right-bottom';
        else arrowClass = 'tooltip-arrow-right-center';
    } else if (position === 'right') {
        if (align === 'start') arrowClass = 'tooltip-arrow-left-top';
        else if (align === 'end') arrowClass = 'tooltip-arrow-left-bottom';
        else arrowClass = 'tooltip-arrow-left-center';
    }

    let tooltipContent = '';
    const titleHtml = hs.tooltipTitle ? `<div class="tooltip-title">${hs.tooltipTitle}</div>` : '';
    
    // Определяем текст кнопки только для невидимых хотспотов
    let buttonText = '';
    if (hs.invisible === true) {
        buttonText = currentStep < currentScenario.totalSteps  ? 'Далее' : 'Завершить';
    }
    const buttonAction = 'nextStep()';
    
    // Определяем, нужно ли показывать стрелку
    const showArrow = hs.invisible !== true;
    const arrowHtml = showArrow ? `<div class="tooltip-arrow ${arrowClass}"></div>` : '';
    
    if (position === 'top') {
        tooltipContent = `
            ${arrowHtml}
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    } else if (position === 'bottom') {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
            ${arrowHtml}
        `;
    } else if (position === 'left') {
        tooltipContent = `
            ${arrowHtml}
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    } else if (position === 'right') {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
            ${arrowHtml}
        `;
    } else {
        tooltipContent = `
            <div class="tooltip-inner">
                ${titleHtml}
                <p>${hs.tooltipText || 'Tooltip'}</p>
                <div class="tooltip-actions">
                    <button class="prev" onclick="prevStep()">Назад</button>
                    ${hs.invisible === true ? `<button class="next" onclick="${buttonAction}">${buttonText}</button>` : ''}
                </div>
            </div>
        `;
    }
    if(hs.invisible === false)
        {
            hotspotDiv.addEventListener('click', function(e) {
                if (e.target === hotspotDiv) {
                    nextStep();
                }
            });
        }

        if (hs.invisible === true) {
            hotspotDiv.style.background = 'transparent';
            hotspotDiv.style.border = 'none';
            hotspotDiv.style.boxShadow = 'none';
            hotspotDiv.style.animation = 'none';
        }



    tooltip.innerHTML = tooltipContent;
    hotspotDiv.appendChild(tooltip);
    tooltip.style.display = 'block';
    
    // Добавляем маскота рядом с тултипом (если не отключен)
    if (hs.showMascot !== false) { // По умолчанию показываем маскота
        const mascot = createMascot(position, align, hs.mascotPosition);
        if (mascot) {
            // Добавляем маскота как дочерний элемент тултипа для правильного позиционирования
            tooltip.appendChild(mascot);
            // Плавное появление маскота
            setTimeout(() => {
                mascot.classList.add('mascot-show');
            }, 50);
        }
    }
    
    // Плавное появление тултипа
    setTimeout(() => {
        tooltip.classList.add('tooltip-show');
    }, 10);


    // Функция для позиционирования tooltip (может принимать новые параметры)
    function positionTooltip(hsArg = hs, positionArg = position, alignArg = align) {
        tooltip.style.left = '';
        tooltip.style.top = '';
        tooltip.style.width = '';
        tooltip.style.maxWidth = '';
        requestAnimationFrame(() => {
            const ttRect = tooltip.getBoundingClientRect();
            const hsRect = hotspotDiv.getBoundingClientRect();
            let left = 0, top = 0;
            // TOP
            if (positionArg === 'top') {
                if (alignArg === 'start') {
                    left = 0;
                } else if (alignArg === 'end') {
                    left = hsRect.width - ttRect.width;
                } else {
                    left = (hsRect.width - ttRect.width) / 2;
                }
                top = -ttRect.height - 8;
            }
            // BOTTOM
            else if (positionArg === 'bottom') {
                if (alignArg === 'start') {
                    left = 0;
                } else if (alignArg === 'end') {
                    left = hsRect.width - ttRect.width;
                } else {
                    left = (hsRect.width - ttRect.width) / 2;
                }
                top = hsRect.height + 8;
            }
            // LEFT
            else if (positionArg === 'left') {
                left = -ttRect.width - 8;
                if (alignArg === 'start') {
                    top = 0;
                } else if (alignArg === 'end') {
                    top = hsRect.height - ttRect.height;
                } else {
                    top = (hsRect.height - ttRect.height) / 2;
                }
            }
            // RIGHT
            else if (positionArg === 'right') {
                left = hsRect.width + 8;
                if (alignArg === 'start') {
                    top = 0;
                } else if (alignArg === 'end') {
                    top = hsRect.height - ttRect.height;
                } else {
                    top = (hsRect.height - ttRect.height) / 2;
                }
            }
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            
            // Позиционируем маскота относительно тултипа
            const mascot = hotspotDiv.querySelector('.tooltip-mascot');
            if (mascot) {
                // Маскот позиционируется относительно тултипа через CSS
                // Дополнительная логика может быть добавлена здесь при необходимости
            }
        });
    }

    window.addEventListener('resize', positionTooltip);
    setTimeout(positionTooltip, 0);
    hotspotDiv._removeTooltipResize = () => {
        window.removeEventListener('resize', positionTooltip);
    };
    container.appendChild(hotspotDiv);
}
