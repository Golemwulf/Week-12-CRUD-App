const url = 'https://667b271abd627f0dcc91d6ca.mockapi.io/Promineo_Tech_API/client'

$(document).ready(function() {
    // Function to fetch clients from API and display
    function fetchClients() {
        $.get(url, function(clients) {
            $('#clientList').empty(); // Clear existing list
            clients.forEach(function(client) {
                $('#clientList').append(`
                    <li class="list-group-item" data-id="${client.id}">
                        <span>Name: ${client.name}</span><br>
                        <span>Email: ${client.email}</span><br>
                        <span>Phone: ${client.phone}</span><br>
                        <button class="btn btn-danger btn-sm float-right delete-client">Delete</button>
                    </li>
                `);
            });
        });
    }

    // Initial fetch of clients when page loads
    fetchClients();

    // Add Client Form Submission
    $('#addClientForm').submit(function(event) {
        event.preventDefault();
        let formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val()
        };
        $.post(url, formData, function(response) {
            alert('Client added successfully');
            $('#addClientForm')[0].reset(); // Clear form
            fetchClients(); // Refresh client list
        });
    });

    // Delete Client Button Click (Event delegation)
    $('#clientList').on('click', '.delete-client', function() {
        let clientId = $(this).closest('li').data('id');
        $.ajax({
            url: `${url}/${clientId}`,
            type: 'DELETE',
            success: function(response) {
                alert('Client deleted successfully');
                fetchClients(); // Refresh client list
            }
        });
    });
});
