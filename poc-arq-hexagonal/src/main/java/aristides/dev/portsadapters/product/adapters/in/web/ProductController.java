package aristides.dev.portsadapters.product.adapters.in.web;

import aristides.dev.portsadapters.product.adapters.in.dto.ProductDTO;
import aristides.dev.portsadapters.product.adapters.in.dto.ProductRequest;
import aristides.dev.portsadapters.product.core.ports.in.ChangeProductStatusUseCase;
import aristides.dev.portsadapters.product.core.ports.in.CreateProductUseCase;
import aristides.dev.portsadapters.product.core.ports.in.FindProductUseCase;
import aristides.dev.portsadapters.product.core.ports.in.UpdateProductUseCase;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RequestMapping("/products")
@RestController
public class ProductController {

    private final CreateProductUseCase createProductUseCase;
    private final UpdateProductUseCase updateProductUseCase;
    private final ChangeProductStatusUseCase changeProductStatusUseCase;
    private final FindProductUseCase findProductUseCase;

    public ProductController(
            CreateProductUseCase createProductUseCase,
            UpdateProductUseCase updateProductUseCase,
            ChangeProductStatusUseCase changeProductStatusUseCase,
            FindProductUseCase findProductUseCase
    ) {
        this.createProductUseCase = createProductUseCase;
        this.updateProductUseCase = updateProductUseCase;
        this.changeProductStatusUseCase = changeProductStatusUseCase;
        this.findProductUseCase = findProductUseCase;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable String id) {
        var product = findProductUseCase.findById(id);
        return ResponseEntity.ok(ProductDTO.fromDomain(product));
    }

    @PostMapping
    public ResponseEntity<String> createProduct(@RequestBody ProductRequest request) {
        var result = createProductUseCase.create(request.name(), request.price());
        return ResponseEntity.created(URI.create("/products")).body(result);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductDTO> updateProduct(
            @PathVariable String id,
            @RequestBody ProductRequest request
    ) {
        var result = updateProductUseCase.update(id, request.name(), request.price());
        return ResponseEntity.ok(ProductDTO.fromDomain(result));
    }

    @PostMapping("/enabled/{id}")
    public ResponseEntity<Void> enabledProduct(@PathVariable String id) {
        changeProductStatusUseCase.enable(id);
        return ResponseEntity.accepted().build();
    }

    @PostMapping("/disabled/{id}")
    public ResponseEntity<Void> disabledProduct(@PathVariable String id) {
        changeProductStatusUseCase.disable(id);
        return ResponseEntity.accepted().build();
    }
}
