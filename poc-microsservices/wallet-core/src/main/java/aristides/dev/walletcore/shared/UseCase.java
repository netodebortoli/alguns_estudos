package aristides.dev.walletcore.shared;

public interface UseCase<INPUT, OUTPUT> {
    OUTPUT execute(INPUT input);
}
