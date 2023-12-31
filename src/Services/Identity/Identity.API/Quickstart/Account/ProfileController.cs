﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.eShopOnContainers.Services.Identity.API.Services;

namespace Identity.API.Quickstart.Account
{
    
    [Route("api/v1/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileQueries _profileQuery;
        private readonly ILogger<ProfileController> _logger;
        
        public ProfileController(
        IProfileQueries profileQuery,
        ILogger<ProfileController> logger)
        {
            _profileQuery = profileQuery ?? throw new ArgumentNullException(nameof(profileQuery));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        //PUT api/v1/[controller]
        [Route("user")]
        [HttpPost]
        [ProducesResponseType(typeof(ApplicationUser), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ApplicationUser>> UpdateProfileAsync([FromBody] ApplicationUser userToUpdate)
        {
            _logger.LogInformation(
                "Receving UpdateProfileAsync POST");
            try
            {
                var profile = await _profileQuery.UpdateProfile(userToUpdate);

                return Ok(profile);
            }
            catch(Exception ex)
            {
                _logger.LogInformation(ex.ToString());
                return NotFound();
            }
        }
    }
}
