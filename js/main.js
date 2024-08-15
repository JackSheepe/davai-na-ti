gsap.registerPlugin(ScrollTrigger);

document.addEventListener("mousemove", moveParallax);

function moveParallax(e) {
  const gradientOverlay = document.querySelector(".gradient-overlay");

  // Вычисляем координаты центра .parallax-container
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Вычитаем половину ширины и высоты .parallax-container, чтобы получить координаты центра относительно всего окна
  const offsetX = e.clientX - (centerX - 793 / 2);
  const offsetY = e.clientY - (centerY - 687 / 2);

  gsap.to(gradientOverlay, {
    x: offsetX / 5,
    y: offsetY / 5,
    duration: 1,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const circle = document.querySelector(".circle");

  let initialScrollTop = window.scrollY || document.documentElement.scrollTop;
  let initialCircleState = {
    scale: 1,
    x: window.innerWidth / 2 - circle.offsetWidth,
  };

  const aboveCircles = document.querySelectorAll(".above-circle");
  let scrollTimeout;

  window.addEventListener("scroll", function () {
    requestAnimationFrame(function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollDirection = scrollTop > initialScrollTop ? 1 : -1;
      const centerX = window.innerWidth / 2;
      const rect = circle.getBoundingClientRect();

      const distanceFromCenter = Math.abs(centerX - rect.left);

      // Вычисляем новый масштаб на основе расстояния от центра экрана
      const newScale = 1 + (Math.min(distanceFromCenter, 200) / 200) * 4; // Меньшее влияние скорости прокрутки

      // Обновляем начальное состояние для следующего кадра
      if (scrollDirection === 1) {
        initialCircleState.scale = newScale;
        initialCircleState.x = window.innerWidth / 2 - circle.offsetWidth;
      } else {
        // При прокрутке назад возвращаем элемент в исходное состояние
        initialCircleState.scale = 1;
        initialCircleState.x = circle.getBoundingClientRect().left / 24;
      }

      gsap.to(circle, {
        duration: 0.5,
        scale: initialCircleState.scale,
        x: initialCircleState.x,
        ease: "power1.inOut",
      });

      clearTimeout(scrollTimeout); // Очищаем предыдущий таймер
      scrollTimeout = setTimeout(function () {
        const rect = circle.getBoundingClientRect();
        aboveCircles.forEach((aboveCircle) => {
          if (rect.top < aboveCircle.offsetTop) {
            // Плавное изменение цвета текста на белый
            gsap.to(aboveCircle, {
              duration: 0.5,
              color: "#E5E5E5",
            });
          } else {
            // Плавное возвращение цвета текста к исходному
            gsap.to(aboveCircle, {
              duration: 0.5,
              color: "inherit",
            });
          }
        });
      }, 500); // Задержка в 500 мс перед выполнением действий
    });
  });

  var dataText = ["выдающимися", "вдохновляющими", "запоминающимися"];

  let currentIndex = 0; // Переменная для отслеживания текущего индекса

  function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
      document.querySelector(".about-us__description_typewriter").innerHTML =
        text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

      setTimeout(function () {
        typeWriter(text, i + 1, fnCallback);
      }, 100);
    } else if (typeof fnCallback == "function") {
      setTimeout(fnCallback, 700);
    }
  }

  function StartTextAnimation() {
    // Проверяем, есть ли следующий элемент в массиве dataText
    if (currentIndex >= dataText.length) {
      currentIndex = 0; // Сбрасываем индекс к началу массива
    }

    if (dataText[currentIndex]) {
      // Если есть текст для анимации
      typeWriter(dataText[currentIndex], 0, function () {
        currentIndex++; // Переходим к следующему элементу
        StartTextAnimation(); // Запускаем следующую итерацию
      });
    } else {
      // Если нет текста, просто запускаем следующую итерацию без задержки
      StartTextAnimation();
    }
  }

  // Начинаем анимацию
  StartTextAnimation();

  const servicesContainer = document.querySelectorAll(".services__item");
  const services = document.querySelectorAll(".services__item");

  services.forEach((item, index) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: -20 },
      {
        scrollTrigger: {
          trigger: servicesContainer,
          start: "top center",
          end: "bottom center",
          scrub: true,
          toggleActions: "play none none reverse",
        },
        duration: 1.5,
        opacity: 1,
        y: 0,
      }
    );
  });
});
