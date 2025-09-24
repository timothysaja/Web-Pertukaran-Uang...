document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount-input');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const convertBtn = document.getElementById('convert-btn');
    const resultOutput = document.getElementById('result-output');

    // Nilai tukar mata uang terbaru (per 24 September 2025)
    // Semua nilai didasarkan pada USD (Dolar AS) sebagai basis.
    const exchangeRates = {
        'USD': 1.0,        // Dolar AS
        'IDR': 16701.24,   // Rupiah Indonesia
        'EUR': 0.93,       // Euro
        'JPY': 157.0,      // Yen Jepang
        'GBP': 0.79,       // Pound Sterling Inggris
        'AUD': 1.5,        // Dolar Australia
        'CAD': 1.36,       // Dolar Kanada
        'SGD': 1.35,       // Dolar Singapura
    };

    // Fungsi untuk mengisi opsi dropdown
    const populateCurrencies = () => {
        for (const currency in exchangeRates) {
            const fromOption = document.createElement('option');
            fromOption.value = currency;
            fromOption.textContent = `${currency} - ${getCurrencyName(currency)}`;
            fromCurrencySelect.appendChild(fromOption);

            const toOption = document.createElement('option');
            toOption.value = currency;
            toOption.textContent = `${currency} - ${getCurrencyName(currency)}`;
            toCurrencySelect.appendChild(toOption);
        }
    };

    // Fungsi pembantu untuk mendapatkan nama mata uang
    const getCurrencyName = (code) => {
        const names = {
            'USD': 'Dolar AS',
            'IDR': 'Rupiah Indonesia',
            'EUR': 'Euro',
            'JPY': 'Yen Jepang',
            'GBP': 'Pound Sterling Inggris',
            'AUD': 'Dolar Australia',
            'CAD': 'Dolar Kanada',
            'SGD': 'Dolar Singapura'
        };
        return names[code] || code;
    };

    // Atur nilai default
    populateCurrencies();
    fromCurrencySelect.value = 'IDR';
    toCurrencySelect.value = 'USD';

    // Fungsi untuk melakukan konversi
    const convertCurrency = () => {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultOutput.textContent = '0.00';
            return;
        }

        // Konversi ke USD terlebih dahulu (mata uang basis)
        const amountInUSD = amount / exchangeRates[fromCurrency];

        // Konversi dari USD ke mata uang tujuan
        const convertedAmount = amountInUSD * exchangeRates[toCurrency];

        resultOutput.textContent = convertedAmount.toFixed(2);
    };

    // Tambahkan event listener untuk tombol dan input
    convertBtn.addEventListener('click', convertCurrency);
    amountInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            convertCurrency();
        }
    });

    // Tambahkan event listener untuk perubahan dropdown
    fromCurrencySelect.addEventListener('change', convertCurrency);
    toCurrencySelect.addEventListener('change', convertCurrency);

});