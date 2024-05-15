import {useState} from 'react'
import {Button} from '@/components/button'
import {Card, Input, HorizontalDivider} from '../base'

export default function PaymentAccount({account_name, account_number, account_bank, onClick, mutationLoading}) {
  const [accountNumber, setAccountNumber] = useState('')
  const [accountName, setAccountName] = useState('')
  const [accountBank, setAccountBank] = useState('')

  function handlePayment() {
    onClick({
      accountNumber: account_number || accountNumber,
      accountName: account_name || accountName,
      accountBank: account_bank || accountBank,
    })
  }

  return (
    <div className="mt-2 text-left">
      <Card>
        <section className="flex justify-between items-center mb-4">
          <h4 className="text-base text-gray-800 font-semibold leading-4 pt-1">Konfirmasi Pembayaran</h4>
        </section>
        <HorizontalDivider className="mb-4" />

        <section className="space-y-4 mb-6">
          <Input
            id="account-number"
            label="Nomor Rekening"
            value={account_number || accountNumber}
            onChange={(text) => setAccountNumber(text)}
            disabled={account_number ? true : false}
            validation={{
              required: {value: true, message: 'Silahkan Isi Nomor Rekening'},
              number: {value: true, message: 'Nomor Rekening hanya boleh diisi dengan angka'},
            }}
          />
          <Input
            id="account-name"
            label="Nama Pemilik Rekening"
            value={account_name || accountName}
            onChange={(text) => setAccountName(text)}
            disabled={account_name ? true : false}
            validation={{
              required: {value: true, message: 'Silahkan Isi Nama Pemilik Rekening'},
            }}
          />

          <Input
            id="account-bank"
            label="Nama Bank"
            value={account_bank || accountBank}
            onChange={(text) => setAccountBank(text)}
            disabled={account_bank ? true : false}
            validation={{
              required: {value: true, message: 'Silahkan Isi Nama Bank Rekening'},
            }}
          />
        </section>

        <section className="ml-4 mb-6">
          <ul className="text-gray-500 space-y-1 text-xs list-disc list-outside">
            <li>Masukan info terkait di atas sesuai pada buku tabungan.</li>
            <li>
              Untuk pembayaran lewat teller, isi “No Rekening” dengan 0000. Lalu isi “Nama Pemilik Rekening” dengan nama
              Anda.
            </li>
          </ul>
        </section>

        <section>
          <Button
            className="w-full"
            onClick={handlePayment}
            type={
              !accountName || !accountNumber || isNaN(accountNumber) || !accountBank
                ? 'disabled'
                : mutationLoading
                ? Button.PROCESSING
                : ''
            }
          >
            Konfirmasi
          </Button>
        </section>
      </Card>
    </div>
  )
}
