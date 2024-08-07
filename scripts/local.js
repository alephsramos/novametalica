function initMap() {
    const geocoder = new google.maps.Geocoder();
    const address = 'Rod. Presidente Dutra, Nº XX - Cidade Jardim Marajoara, Japeri/RJ, Brasil';

    geocoder.geocode({ address: address }, function(results, status) {
        if (status === 'OK') {
            const location = results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 13,
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