function initMap() {
    const geocoder = new google.maps.Geocoder();
    const address = 'R. Eng. Waterley, Lt 12 Qd 16 - Cidade Jardim Marajoara, Japeri/RJ - 26413-040';

    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 12,
                center: location,
            });

            const marker = new google.maps.Marker({
                position: location,
                map: map,
                title: 'Meu Negócio',
            });
        } else {
            alert('Não foi possível encontrar o endereço: ' + status);
        }
    });
}
