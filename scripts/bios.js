function calculateAge(birthDate, currentDate) {
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const isBeforeBirthday = 
        currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
    if (isBeforeBirthday) {
        age--;
    }
    return age;
}

function updateAge() {
    const birthDate = new Date('2004-01-15');
    const currentDate = new Date();
    const age = calculateAge(birthDate, currentDate);
    document.getElementById('age').textContent = age;
}

document.addEventListener('DOMContentLoaded', updateAge);