const RENT_DURATION_OPTIONS = [
  {
    key: 1,
    text: 'Daily',
    value: 'daily',
  },
  {
    key: 2,
    text: 'Hourly',
    value: 'hourly',
  },
  {
    key: 3,
    text: 'Weekly',
    value: 'weekly',
  },
  {
    key: 4,
    text: 'Monthly',
    value: 'monthly',
  },
  {
    key: 5,
    text: 'Annually',
    value: 'annually',
  },
]

const INITIAL_UPSERT_PRODUCT_FORM_VALUES = {
  title: '',
  description: '',
  categories: [],
  purchase_price: '',
  rent_price: '',
  rent_duration: '',
}

export { RENT_DURATION_OPTIONS, INITIAL_UPSERT_PRODUCT_FORM_VALUES };
