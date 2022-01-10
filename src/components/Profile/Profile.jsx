import React from 'react'
import './profile.css'

function Profile() {
    return (
        <div className='container'>
            <div class="container m-5" style={{ marginTop: '800px' }}>
                <div class="row gutters">
                    <div class="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                                <div class="account-settings">
                                    <div class="user-profile">
                                        <div class="user-avatar d-flex justify-content-center">
                                            <img src="https://wallpaperaccess.com/full/1209397.jpg" alt="Maxwell Admin" />
                                        </div>
                                            <>
                                                <h5 class="user-name">xxx</h5>
                                                <h6 class="user-email">xxx</h6>
                                            </>
                                    </div>
                                    <div class="about">
                                        <h5>Hakkımda</h5>
                                        <p>xxx</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div class="card h-100">
                            <div class="card-body">
                            
                                    <div class="row gutters">
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 class="mb-4 text-primary">Kişisel Bilgiler</h6>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='name' className='mb-1'>Ad</label>
                                                <input type="text" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='surname' className='mb-1'>Soyad</label>
                                                <input type="text" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='username' className='mb-1'>Kullanıcı Adı</label>
                                                <input type="url" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='phone' className='mb-1'>Telefon</label>
                                                <input type="text" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='email' className='mb-1'>E-posta</label>
                                                <input type="email" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor="eMail" className='mb-1'>Cinsiyet</label>
                                                <select type="text" class="form-control" id="eMail" name="cars">
                                                    <option value="erkek">Erkek</option>
                                                    <option value="kadın">Kadın</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='birthdate' className='mb-1'>Doğum Tarihi</label>
                                                <input type="date" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='registerdate' className='mb-1'>Kayıt Tarihi</label>
                                                <input type="date" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div class="form-group mb-3">
                                                <label htmlFor='about' className='mb-1'>Hakkımda</label>
                                                <textarea rows={4} type="name" class="form-control" value="sfsd" readonly />
                                            </div>
                                        </div>
                                    </div>

                                <div class="row gutters mt-4">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <h6 class="mt-4 mb-3 text-primary">Şifre Değiştir</h6>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group mb-3">
                                            <label htmlFor="Street" className='mb-1'>Şifre</label>
                                            <input type="password" class="form-control" id="Street" placeholder="Enter Street" />
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div class="form-group mb-3">
                                            <label htmlFor="ciTy" className='mb-1'>Şifre Tekrar</label>
                                            <input type="password" class="form-control" id="ciTy" placeholder="Enter City" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row gutters">
                                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                        <div class="text-right">
                                            <button type="button" id="submit" name="submit" class="btn btn-secondary ml-2">İptal</button>
                                            <button type="button" id="submit" name="submit" class="btn btn-primary m-2">Kaydet</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
