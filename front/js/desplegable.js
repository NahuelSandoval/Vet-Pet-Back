document.addEventListener('click', function(event) {
    var dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(function(dropdown) {
        if (!event.target.matches('.dropdown-btn')) {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        }
    });
});

document.querySelectorAll('.dropdown-btn').forEach(function(btn) {
    btn.addEventListener('click', function(event) {
        event.stopPropagation();
        var dropdown = this.nextElementSibling;
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
});