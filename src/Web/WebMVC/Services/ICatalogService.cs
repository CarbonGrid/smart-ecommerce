namespace Microsoft.eShopOnContainers.WebMVC.Services;

public interface ICatalogService
{
    Task<Catalog> GetCatalogItems(int page, int take, int? brand, int? type);
    Task<IEnumerable<SelectListItem>> GetBrands();
    Task<IEnumerable<SelectListItem>> GetTypes();
    Task<Catalog> GetCatalogItemsBySearch(int page, int take, string searchText);
    Task UpdateSearchHistory(string searchText);
}
