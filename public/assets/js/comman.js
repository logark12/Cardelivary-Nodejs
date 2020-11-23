$('.select2').select2({
    placeholder: "Select Option",
    allowClear: true
});


                                                
$('.datatable').DataTable({
'destroy': true,
'paging': true,
'lengthChange': true,
'searching': true,
'ordering': false,
'info': true,
'autoWidth': false,
'info': true,
'LengthMenu': [[10, 25, 50, 75, -1], [10, 25, 50, 75, "All"]],
"dom": '<"row" <"col-sm-6" <"inline-block m-right-15" l><"inline-block" B> > <"col-sm-6" f> >' +
'<"row" <"col-sm-12" t> >' +
          '<"row m-top-10" <"col-sm-6" i> <"col-sm-6" p> >',
         // "dom": '<"html5buttons"B>lTfgitp',
          "buttons": [
      { extend: 'copy' },
      { extend: 'excel', title: 'tblUsers' },
      { extend: 'csv' },
      { extend: 'pdf', title: 'tblUsers' },
      {
          extend: 'print',
          customize: function (win) {
              $(win.document.body).addClass('white-bg');
              $(win.document.body).css('font-size', '10px');

              $(win.document.body).find('table')
                  .addClass('compact')
                  .css('font-size', 'inherit');
          }
      },
      { extend: 'colvis' }
          ],
          "scrollCollapse": true,
          "bProcessing": true
        
});


                                                
$('.datatableReports').DataTable({
    'destroy': true,
    'paging': true,
    'lengthChange': true,
    'searching': true,
    'ordering': false,
    'info': true,
    'autoWidth': false,
    'info': true,
    "lengthMenu": [[25, 50, 100,150], [25, 50, 100,150]],
    "dom": '<"row" <"col-sm-6" <"inline-block m-right-15" l><"inline-block" B> > <"col-sm-6" f> >' +
    '<"row" <"col-sm-12" t> >' +
              '<"row m-top-10" <"col-sm-6" i> <"col-sm-6" p> >',
             // "dom": '<"html5buttons"B>lTfgitp',
              "buttons": [
          { extend: 'copy' },
          { extend: 'excel', title: 'tblUsers' },
          { extend: 'csv' },
          { extend: 'pdf', title: 'tblUsers' },
          {
              extend: 'print',
              customize: function (win) {
                  $(win.document.body).addClass('white-bg');
                  $(win.document.body).css('font-size', '10px');
    
                  $(win.document.body).find('table')
                      .addClass('compact')
                      .css('font-size', 'inherit');
              }
          },
          { extend: 'colvis' }
              ],
              "scrollCollapse": true,
              "bProcessing": true
            
    });