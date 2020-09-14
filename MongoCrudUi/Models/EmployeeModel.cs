using System.ComponentModel.DataAnnotations;

namespace MongoCrudUi.Models
{
    public class EmployeeModel
    {
        public string Id { get; set; }
        
        [Required(ErrorMessage = "Please enter a name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter a department")]
        public string Department { get; set; }

        [Required(ErrorMessage = "Please enter a designation")]
        public string Designation { get; set; }

        [Required(ErrorMessage = "Please enter age")]
        [Range(18, 70, ErrorMessage ="Age must be between 18 and 70 years.")]
        public int Age { get; set; }

        [Required(ErrorMessage = "Please enter a city")]
        public string City { get; set; }

        [Required(ErrorMessage = "Please enter a country")]
        public string Country { get; set; }

        [Required(ErrorMessage = "Please enter a gender")]
        public string Gender { get; set; }
    }
}
