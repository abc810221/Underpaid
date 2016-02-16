var app = {
  server: "https://data.usajobs.gov/api/jobs",

  fetch: function(input){
    $.ajax({
      type: 'GET',
      url: app.server+'?Title='+input,
      contentType: 'application/json',
      success: function(data){
        data = data.JobData;
        for(var i=0; i<data.length;i++){
          app.loadJobs(data[i]);
        }
      }
    })
  },
  fetchone: function(input){
    $.ajax({
      type: 'GET',
      url: app.server+'?Title='+input+'&NumberOfJobs=1',
      contentType: 'application/json',
      success: function(data){
        console.log(data) 
        data = data.JobData;
        app.userJob(data[0],input);
      }
    })
  },
  loadJobs: function(data){
    var job = data.AgencySubElement;
    var title = data.JobTitle;
    var location = data.Locations;
    var salarymax = data.SalaryMax;
    var salarymin = data.SalaryMin;

    var display = $('<div class="job"></div>')
    display.append(job+'<br>'+title+'<br>'+location+'<br>'+salarymax+'<br>'+salarymin+'<br><br>')
    $('#test').append(display);
  },
  userJob: function(data, input){
    var title = data.JobTitle;
    var salarymax = data.SalaryMax;
    var salarymin = data.SalaryMin;
    var average = (Number(salarymin.slice(1).replace(',',''))+Number(salarymax.slice(1).replace(',','')))/2;    

    var display = $('<div class="job"></div>')
    display.append('Title:  '+input+'<br>'+'Average Salary: '+average);
    $('#average').append(display)
  }

}
  $('.submit').submit(function(event){
    var input = $('#maininput').val();
    app.fetchone(input);
  })
  $('.submit').submit(function(event){
    var input = $('#maininput').val();
    app.fetch(input);
  })






