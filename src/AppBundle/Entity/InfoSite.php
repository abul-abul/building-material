<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Category
 *
 * @ORM\Table(name="info_site")
 * @ORM\Entity(repositoryClass="AppBundle\Entity\Repository\InfoSiteRepository")
 */
class InfoSite
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var
     * @ORM\Column(name="address", type="string", nullable=true)
     */
    protected $address;


    /**
     * @var
     * @ORM\Column(name="phone", type="string", nullable=true)
     */
    protected $phone;


    /**
     * @var
     * @ORM\Column(name="email", type="string", nullable=true)
     */
    protected $email;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set address.
     *
     * @param string $address
     *
     * @return InfoSite
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }

    /**
     * Get address.
     *
     * @return string
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set phone.
     *
     * @param int $phone
     *
     * @return InfoSite
     */
    public function setPhone($phone)
    {
        $this->phone = $phone;

        return $this;
    }

    /**
     * Get phone.
     *
     * @return int
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set email.
     *
     * @param string $email
     *
     * @return InfoSite
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email.
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }
}
