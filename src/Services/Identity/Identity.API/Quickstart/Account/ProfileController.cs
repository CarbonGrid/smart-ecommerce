using Microsoft.AspNetCore.Mvc;
using Microsoft.eShopOnContainers.Services.Identity.API.Services;

namespace Identity.API.Quickstart.Account
{
    
    [Route("api/v1/[controller]")]
    [Authorize]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileQueries _profileQuery;

        //PUT api/v1/[controller]/user
        [Route("users")]
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ApplicationUser> UpdateProfileAsync([FromBody] ApplicationUser userToUpdate)
        {
            try
            {
                var profile = await _profileQuery.UpdateProfile(userToUpdate);

                return profile;
            }
            catch
            {
                return null;
            }
        }
    }
}
