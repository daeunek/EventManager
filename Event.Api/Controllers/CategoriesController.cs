using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Repositories.Interface;
using Models.DTO;
using Models;
using Microsoft.AspNetCore.Authorization;

namespace Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            this.categoryRepository = categoryRepository;
        }

        // POST: https//localhost:7294/api/categories
        [HttpPost]
        [Authorize(Roles = "Admin")] 

        public async Task<IActionResult> CreateCategory(CreateCateogoryRequestDto request){
            //Map DTO to domain model
            var category = new Category
            {
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            category = await categoryRepository.CreateAsync(category);

            var response = new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
                UrlHandle = category.UrlHandle
            };

            return Ok(response);
        }

        // GET: https//localhost:7294/api/categories
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await categoryRepository.GetAllAsync();

            var response = new List<CategoryDto>();
            foreach (var category in categories)
            {
                response.Add(new CategoryDto
                {
                    Id = category.Id,
                    Name = category.Name,
                    UrlHandle = category.UrlHandle
                });
            }
            return Ok(response);
        }

        // GET: https//localhost:7294/api/categories/{id}
        [HttpGet]
        [Route("{id:Guid}")]

        public async Task<IActionResult> GetCategoryById(Guid id)
        {
            var existingCategory = await categoryRepository.GetByIdAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle
            };
            return Ok(response);
        }

        // PUT: https//localhost:7294/api/categories/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")] 

        public async Task<IActionResult> UpdateCategory([FromRoute] Guid id, UpdateCategoryRequestDto request)
        {
            var category = new Category{
                Id = id,
                Name = request.Name,
                UrlHandle = request.UrlHandle
            };

            var updatedCategory = await categoryRepository.UpdateAsync(category);
            if (updatedCategory == null)
            {
                return NotFound();
            }

            var response = new CategoryDto
            {
                Id = updatedCategory.Id,
                Name = updatedCategory.Name,
                UrlHandle = updatedCategory.UrlHandle
            };
            return Ok(response);
        }

        // DELETE: https//localhost:7294/api/categories/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize(Roles = "Admin")] 
        public async Task<IActionResult> DeleteCategory([FromRoute] Guid id)
        {
            var existingCategory = await categoryRepository.DeleteAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }
            var response = new CategoryDto
            {
                Id = existingCategory.Id,
                Name = existingCategory.Name,
                UrlHandle = existingCategory.UrlHandle
            };
            return Ok(response);
        }
        
    }
}