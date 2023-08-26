import BigNumber from 'bignumber.js'

export const currencySettingsMap: Record<string, { prefix: string; suffix: string }> = {
	BTC: { prefix: '₿', suffix: '' },
	ETH: { prefix: 'Ξ', suffix: '' },
	ARS: { prefix: '$', suffix: '' },
	AUD: { prefix: '$', suffix: '' },
	BRL: { prefix: 'R$', suffix: '' },
	CAD: { prefix: '$', suffix: '' },
	CLP: { prefix: '$', suffix: '' },
	CNY: { prefix: '¥', suffix: '' },
	COP: { prefix: '$', suffix: '' },
	CZK: { prefix: '', suffix: 'Kč' },
	DKK: { prefix: 'kr.', suffix: '' },
	EUR: { prefix: '', suffix: '€' },
	HKD: { prefix: 'HK$', suffix: '' },
	HUF: { prefix: '', suffix: 'Ft' },
	IDR: { prefix: 'Rp', suffix: '' },
	INR: { prefix: '₹', suffix: '' },
	ILS: { prefix: '₪', suffix: '' },
	JPY: { prefix: '¥', suffix: '' },
	KRW: { prefix: '₩', suffix: '' },
	MYR: { prefix: 'RM', suffix: '' },
	MXN: { prefix: '$', suffix: '' },
	MAD: { prefix: '', suffix: '.د.م.' },
	NZD: { prefix: '$', suffix: '' },
	NOK: { prefix: 'kr', suffix: '' },
	PHP: { prefix: '₱', suffix: '' },
	PLN: { prefix: '', suffix: 'zł' },
	RUB: { prefix: '', suffix: 'p.' },
	SAR: { prefix: '', suffix: '﷼' },
	SGD: { prefix: '$', suffix: '' },
	SEK: { prefix: '', suffix: 'kr' },
	CHF: { prefix: 'fr.', suffix: '' },
	TWD: { prefix: '元', suffix: '' },
	THB: { prefix: '', suffix: '฿' },
	TRY: { prefix: '', suffix: '₺' },
	GBP: { prefix: '£', suffix: '' },
	USD: { prefix: '$', suffix: '' },
	VND: { prefix: '', suffix: '₫' },
}

BigNumber.set({
	ROUNDING_MODE: BigNumber.ROUND_HALF_UP,
	EXPONENTIAL_AT: [-30, 30],
})

const format = {
	prefix: '',
	suffix: '',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 3,
	secondaryGroupSize: 0,
	fractionGroupSeparator: ' ',
	fractionGroupSize: 0,
}

export const formatBigNumber = (x: BigNumber, currency: string = '', decimalPlaces: number = 9) =>
	currency
		? x.toFormat(decimalPlaces, {
				...format,
				...(currencySettingsMap[currency.toUpperCase() as keyof typeof currencySettingsMap] || {}),
		  })
		: x.decimalPlaces(decimalPlaces).toString()

export const formatChange = (change: BigNumber): string => {
	if (!change) return '0.00%'
	const percentageChange = !change.isEqualTo(0)
		? `${change.isGreaterThan(0) ? '+' : ''}${change.toFixed(2).toLocaleString()}%`
		: '0.00%'

	return percentageChange
}
