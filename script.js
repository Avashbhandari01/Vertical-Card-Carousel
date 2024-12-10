class VerticalCarousel {
    constructor(carouselElement) {
        this.carousel = carouselElement;
        this.cards = Array.from(this.carousel.querySelectorAll('.card'));
        this.currentIndex = 0;
        this.totalCards = this.cards.length;

        this.isDragging = false;
        this.startY = 0;
        this.currentY = 0;
        this.dragThreshold = 50;


        this.updateCardPositions();
        this.addDragEventListeners();
    }

    addDragEventListeners() {
        this.carousel.addEventListener('mousedown', this.startDrag.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.endDrag.bind(this));
    }

    startDrag(e) {
        e.preventDefault();

        this.startY = this.getYPosition(e);
        this.isDragging = true;
    }

    drag(e) {
        if (!this.isDragging) return;

        this.currentY = this.getYPosition(e);

        const dragDistance = this.currentY - this.startY;

        if (Math.abs(dragDistance) >= this.dragThreshold) {
            if (dragDistance > 0) {
                this.scrollToPrevCard();
            } else {
                this.scrollToNextCard();
            }
            this.isDragging = false;
        }
    }

    endDrag() {
        this.isDragging = false;
    }

    getYPosition(e) {

        return e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
    }

    updateCardPositions() {
        this.cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            const normalizedCurrentIndex = this.currentIndex % this.totalCards;
            const normalizedIndex = index % this.totalCards;

            if (normalizedIndex === normalizedCurrentIndex) {
                card.classList.add('active');
            } else if (
                normalizedIndex ===
                (normalizedCurrentIndex - 1 + this.totalCards) % this.totalCards
            ) {
                card.classList.add('prev');
            } else if (
                normalizedIndex ===
                (normalizedCurrentIndex + 1) % this.totalCards
            ) {
                card.classList.add('next');
            }
        });
    }

    scrollToNextCard() {
        this.currentIndex++;
        this.updateCardPositions();
    }

    scrollToPrevCard() {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.totalCards - 1;
        }
        this.updateCardPositions();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    new VerticalCarousel(carousel);
});