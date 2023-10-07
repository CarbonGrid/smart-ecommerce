namespace Microsoft.eShopOnContainers.Services.Identity.API.Services
{
    public class ProfileQueries : IProfileQueries
    {
        private string _connectionString = string.Empty;

        public ProfileQueries(string constr)
        {
            _connectionString = !string.IsNullOrWhiteSpace(constr) ? constr : throw new ArgumentNullException(nameof(constr));
        }
        public async Task<ApplicationUser> UpdateProfile(ApplicationUser user)
        {
            using var connection = new SqlConnection(_connectionString);
            connection.Open();

            var result = await connection.QueryAsync<dynamic>(
            @"UPDATE AspNetUsers
                SET Street = @street, City = @city, State = @state, Country = @country, CardNumber = @cardNo, CardHolderName = @cardHolderName, Expiration = @expiration, SecurityNumber = @sercurityNo
                where USER_ID = @id"
                , new { id = user.Id, street = user.Street, city = user.City, state = user.State, country = user.Country, cardNo = user.CardNumber, cardHolderName = user.CardHolderName, expiration = user.Expiration, sercurityNo = user.SecurityNumber }
            );

            if (result.AsList().Count == 0)
                throw new KeyNotFoundException();

            return MapApplicationUsers(result);
        }

        private ApplicationUser MapApplicationUsers(dynamic result)
        {
            var user = new ApplicationUser
            {
                CardNumber = result[0].cardnumber,
                CardHolderName = result[0].cardholdername,
                Expiration = result[0].expiration,
                State = result[0].state,
                Street = result[0].street,
                City = result[0].city,
                ZipCode = result[0].zipcode,
                Country = result[0].country,
                SecurityNumber = result[0].securitynumber
            };
            return user;
        }
    }
}
